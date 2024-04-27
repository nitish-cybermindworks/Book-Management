import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { AuthRO } from './auth.ro';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { GoogleUser } from './entities/google.user.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,

    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,

    @InjectRepository(GoogleUser)
    private readonly googleUserRepository: EntityRepository<GoogleUser>,

    private em: EntityManager,

    @InjectPinoLogger(AuthService.name)
    private logger: PinoLogger,
  ) {
    const frontEndUrlFromConfig = this.configService.get<string>('frontEndUrl');

    if (!frontEndUrlFromConfig) {
      throw new InternalServerErrorException(
        'frontEndUrl is missing in env configuration',
      );
    }

    this.frontEndUrl = frontEndUrlFromConfig;
  }
  frontEndUrl: string;

  getJwtToken(id: number, email: string) {
    const payload = {
      userId: id,
      email: email,
    };
    return this.jwtService.sign(payload);
  }

  async handleGoogleSignin(req: Request, redirectUrl: string | undefined) {
    try {
      const googleUserData = req.user as {
        email: string | null;
        firstName: string;
        lastName: string | null;
        profileImage: string | null;
      };

      if (!googleUserData.email) {
        throw new InternalServerErrorException(
          'Something went wrong, Please try again',
        );
      }

      const user = await this.userRepository.findOne({
        email: googleUserData.email,
      });

      if (user) {
        const jwt = this.getJwtToken(user.id, user.email);

        return {
          statusCode: HttpStatus.FOUND,
          url:
            this.frontEndUrl +
            `/login/?token=${jwt}` +
            (redirectUrl
              ? `&redirectUrl=${encodeURIComponent(redirectUrl)}`
              : ''),
        };
      }

      const googleUserExists = await this.googleUserRepository.findOne({
        email: googleUserData.email,
      });

      let refId = googleUserExists?.referenceId;

      if (!googleUserExists) {
        const newGoogleUser = new GoogleUser({
          firstName: googleUserData.firstName,
          lastName: googleUserData.lastName ?? '',
          email: googleUserData.email,
          referenceId: uuidv4(),
          profileImage: googleUserData.profileImage ?? '',
        });
        refId = newGoogleUser.referenceId;
        this.em.persist(newGoogleUser);
        await this.em.flush();
      }

      return {
        statusCode: HttpStatus.FOUND,
        url:
          this.frontEndUrl +
          `/signup/?refId=${refId}` +
          (redirectUrl
            ? `&redirectUrl=${encodeURIComponent(redirectUrl)}`
            : ''),
      };
    } catch (error) {
      this.logger.error(error);
      return {
        statusCode: HttpStatus.FOUND,
        url: this.frontEndUrl + `/?googleLoginError=true`,
      };
    }
  }
}

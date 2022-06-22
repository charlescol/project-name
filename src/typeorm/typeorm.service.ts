import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

const fs = require('fs');

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private config: ConfigService) {}

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    Logger.log("test", this.config.get<string>('DATABASE_HOST'))
    const productionMode = false;
    return {
      type: 'postgres',
      host: this.config.get<string>('DATABASE_HOST'),
      port: 5432,
      database: this.config.get<string>('DATABASE_NAME'),
      username: this.config.get<string>('DATABASE_USER'),
      password: this.config.get<string>('DATABASE_PASSWORD'),
      //   migrations: ['dist/migrations/*.{ts,js}'],
      logger: 'file',
      synchronize: !productionMode, 
      autoLoadEntities: true,
      ssl: {
        rejectUnauthorized: false,
        requestCert: false,
        ca: fs.readFileSync('./DigiCertGlobalRootCA.crt').toString()
      }
    };
  }
}
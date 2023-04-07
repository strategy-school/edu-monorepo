import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/strategy-school'),
    MongooseModule.forFeature([]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

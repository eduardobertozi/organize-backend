import { Module } from '@nestjs/common'
import { ServantsModule } from './app/servants/servants.module'

@Module({
  imports: [ServantsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

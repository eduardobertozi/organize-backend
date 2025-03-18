import { Module } from '@nestjs/common'
import { ServantsModule } from './modules/servants/servants.module'

@Module({
  imports: [ServantsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

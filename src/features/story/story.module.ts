import { Story, StorySchema } from './schemas/story.schema';
import { CronService } from './cron.service';
import { HnService } from './hn.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Module, HttpModule } from '@nestjs/common';
import { StoryService } from './story.service';
import { StoryController } from './story.controller';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: Story.name, schema: StorySchema }]),
  ],
  controllers: [StoryController],
  providers: [StoryService, HnService, CronService],
})
export class StoryModule {}

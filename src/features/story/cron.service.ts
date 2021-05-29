import { map } from 'rxjs/operators';
import { Story } from './entities/story.entity';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { Injectable, HttpService } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Model } from 'mongoose';

@Injectable()
export class CronService {
  constructor(
    private http: HttpService,
    private configService: ConfigService,
    @InjectModel('Story') private readonly storyModel: Model<Story>,
  ) {}

  // uncomment to test every 10 seconds
  // @Cron('10 * * * * *')
  @Cron('0 0 1 * * *')
  runEveryHour() {
    const uri = this.configService.get('HN_API');
    const list = this.http.get(uri).pipe(map((response: any) => response.data));
    list.subscribe((item: any) => {
      item.hits.map((x: any) => {
        var isThereAnyTitle = x.story_title ? x.story_title : x.title || null;
        if (isThereAnyTitle != null) {
          const newStory = new this.storyModel({
            title: isThereAnyTitle,
            author: x.author || '',
            url: x.url ? x.url : x.story_url || '',
            createdAt: x.created_at || Date.now(),
            active: 1,
          });
          this.isNewStory(isThereAnyTitle, newStory);
        }
      });
    });
  }

  async isNewStory(title: string, newStory: any) {
    const list = await this.storyModel.find({ title: title }).exec();
    if (list.length < 1) {
      await newStory.save();
      console.log('added');
    } else {
      console.log('repeated');
    }
    console.log('---');
  }
}

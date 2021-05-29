import { Story } from './entities/story.entity';
import { HttpService, Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HnService {
  constructor(
    private http: HttpService,
    private configService: ConfigService,
    @InjectModel('Story') private readonly storyModel: Model<Story>,
  ) {}

  addAllElementsfromService() {
    const uri = this.configService.get('HN_API');
    this.http.get(uri).pipe(
      map((response: any) => {
        const newStory = new this.storyModel({
          title: response.title ? response.title : response.story_title,
          author: response.author || '',
          url: response.url ? response.url : response.story_url,
          createdAt: response.created_at || '',
        });
        newStory.save();
      }),
    );
  }
}

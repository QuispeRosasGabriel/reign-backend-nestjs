// import { HnService } from './../features/story/hn.service';
// import { ConfigService } from '@nestjs/config';
// import { map } from 'rxjs/operators';
// import { Story } from './../features/story/entities/story.entity';
// import { InjectModel } from '@nestjs/mongoose';
// import { Injectable, HttpService } from '@nestjs/common';
// import { Cron, CronExpression, Timeout } from '@nestjs/schedule';
// import { Model } from 'mongoose';

// @Injectable()
// export class CronService {
//   constructor(
//     private http: HttpService,
//     private configService: ConfigService,
//     private hnService: HnService,
//     @InjectModel('Story') private readonly storyModel: Model<Story>,
//   ) {}

//   @Cron('*/10 * * * * *')
//   runEvery10Seconds() {
//     const uri = this.configService.get('HN_API');
//     this.http.get(uri).pipe(
//       map((response: any) => {
//         const newStory = new this.storyModel({
//           title: response.title ? response.title : response.story_title,
//           author: response.author || '',
//           url: response.url ? response.url : response.story_url,
//           createdAt: response.created_at || '',
//         });
//         newStory.save();
//       }),
//     );
//   }

//   @Cron(CronExpression.EVERY_MINUTE)
//   runEveryMinute() {
//     console.log('Every minute');
//   }

//   @Timeout(15000)
//   onceAfter15Seconds() {
//     console.log('Called once after 15 seconds');
//   }
// }

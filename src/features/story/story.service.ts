import { ConfigService } from '@nestjs/config';
import { Story } from './entities/story.entity';
import { Injectable } from '@nestjs/common';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StoryDocument } from './schemas/story.schema';

@Injectable()
export class StoryService {
  constructor(
    @InjectModel(Story.name) private readonly storyModel: Model<StoryDocument>,
  ) {}

  async create(createStoryDto: CreateStoryDto) {
    const createdStory = new this.storyModel(createStoryDto);
    return createdStory.save();
  }

  findAll(take: number = 2, limit: number = 25) {
    return this.storyModel
      .find({ active: 1 })
      .skip(limit * (take - 1))
      .limit(limit)
      .exec();
  }

  getCount() {
    return this.storyModel.estimatedDocumentCount();
  }

  findOne(id: string) {
    return this.storyModel.findOne({ _id: id });
  }

  update(id: string, updateStoryDto: UpdateStoryDto) {
    return this.storyModel.updateOne(
      { _id: id },
      { $set: { ...updateStoryDto } },
    );
  }

  // remove(id: number) {
  //   return `This action removes a #${id} story`;
  // }
}

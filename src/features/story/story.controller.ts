import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { StoryService } from './story.service';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';

@Controller('story')
export class StoryController {
  constructor(private readonly storyService: StoryService) {}

  @Post()
  create(@Body() createStoryDto: CreateStoryDto) {
    return this.storyService.create(createStoryDto);
  }

  @Get()
  findAll(@Query('take') take, @Query('limit') limit) {
    return this.storyService.findAll(parseInt(take), parseInt(limit));
  }

  
  @Get('/countDocuments')
  documentsNumber() {
    return this.storyService.getCount();
  }
  
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoryDto: UpdateStoryDto) {
    return this.storyService.update(id, updateStoryDto);
  }
  
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.storyService.findOne(id);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.storyService.remove(+id);
  // }
}

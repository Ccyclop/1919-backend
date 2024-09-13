import { Body, Controller, Delete, Get, Injectable, Param, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController{
    constructor(private readonly searchService:SearchService) {}

    @Get()
    async searchMusic(@Query('q') searchString: string): Promise<Object> {
      return await this.searchService.searchInfo(searchString);
    }
}
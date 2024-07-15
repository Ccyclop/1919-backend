import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Music } from 'src/musics/entities/music.entity';
import { Author } from 'src/authors/entities/author.entity';
import { Album } from 'src/album/entities/album.entity';

@Injectable()
export class SearchRepository {

}
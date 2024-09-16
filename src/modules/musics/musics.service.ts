import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { MusicsRepository } from './musics.repository';
import { MusicEntity } from './entities/music.entity';
import { S3Type } from '../S3/enum/S3.enum';
import { S3Service } from '../S3/S3.service';
import { ListenCounterRepository } from '../listen-counters/listen-counters.repository';
import { AuthorRepository } from '../authors/authors.repository';
import { AlbumRepository } from '../album/album.repository';
import { PlaylistRepository } from '../playlist/playlist.repository';

@Injectable()
export class MusicsService {

  constructor(
    private readonly musicRepo: MusicsRepository,
    private readonly s3Service : S3Service,
    private readonly listenService: ListenCounterRepository,
    private readonly authorRepository : AuthorRepository,
    private readonly albumRepo : AlbumRepository,
    private readonly playlistRepositoty : PlaylistRepository
    
  ) {}

  async create(
    createMusicDto: CreateMusicDto,
    photoFile: Express.Multer.File,
    audioFile: Express.Multer.File,
    userId: number
  ): Promise<MusicEntity> {

    const { name, authorName } = createMusicDto;
    
    const author = await this.authorRepository.getAuthorByName(authorName)
    if(!author) throw new NotFoundException(`author with name ${ authorName} not found`)


    const photoUploadResponse = await this.s3Service.saveS3(photoFile.originalname, photoFile.buffer, photoFile.mimetype, S3Type.PHOTO, userId);
  
    const audioUploadResponse = await this.s3Service.saveS3(audioFile.originalname, audioFile.buffer, audioFile.mimetype, S3Type.AUDIO, userId);
  
    const music = new MusicEntity();
    music.name = name;
    music.author = author
    music.authorName = authorName
    music.photo = photoUploadResponse;  
    music.audio = audioUploadResponse;  
  
    return await this.musicRepo.save(music);
  }

  async findAll() {
    return await this.musicRepo.findAll();
  }

  async findOne(musicId: number, userId: number) {
    const mus = await this.musicRepo.findOne(musicId)

    mus.views++
    
    await this.musicRepo.save(mus)
    if (mus) {
      await this.listenService.create({musicId, userId})

      return await this.musicRepo.findOne(musicId);
    } else throw new NotFoundException('Music Not Found')

  }

  async getMusicNotInAlbum(albumId: number): Promise<MusicEntity[]> {
    const allMusic = await this.musicRepo.findAll();

    const musicInAlbum = await this.albumRepo.getMusicsForAlbum(albumId);

    const musicNotInAlbum = allMusic.filter(
      music => !musicInAlbum.some(albumMusic => albumMusic.id === music.id),
    );

    return musicNotInAlbum;
  }

  async recommended(playlistId:number): Promise<MusicEntity[]> {
    const musics = await this.musicRepo.recommendMusicByPlaylist(playlistId)

    const musicInPlaylist = await this.playlistRepositoty.getMusicsForPLaylist(playlistId);

    const musicNotInPlaylist = musics.filter(
      music => !musicInPlaylist.some(playlistMusic => playlistMusic.id === music.id),
    );

    return musicNotInPlaylist
    
  }

  // async getMusicNotInPlaylist(playlistId: number): Promise<MusicEntity[]> {
  //   const allMusic = await this.musicRepo.findAll();

  //   const musicInPlaylist = await this.playlistRepositoty.getMusicsForPLaylist(playlistId);

  //   const musicNotInPlaylist = allMusic.filter(
  //     music => !musicInPlaylist.some(playlistMusic => playlistMusic.id === music.id),
  //   );

  //   return musicNotInPlaylist;
  // }

  async getMusicInAlbum(albumId: number): Promise<MusicEntity[]> {

    const musicInAlbum = await this.albumRepo.getMusicsForAlbum(albumId);

    return musicInAlbum;
  }

  async getMusicInPlaylist(playlistId: number): Promise<MusicEntity[]> {
    const musicInPLaylist = await this.playlistRepositoty.getMusicsForPLaylist(playlistId);

    return musicInPLaylist;
  }

  // async getHits() {
  //   return this.musicRepo.getTopHits();
  // }

  async getCharts() {
    return await this.musicRepo.getTopCharts()
  }

  async getTop10MusicForLastWeek() {
    const oneWeek = new Date();
    oneWeek.setDate(oneWeek.getDate() - 7);
    return await this.musicRepo.getTop10Music(oneWeek)
  }

  async getTop10MusicForLastMonth() {
    const month = new Date();
    month.setMonth(month.getMonth() - 1);
    return await this.musicRepo.getTop10Music(month)
  }

  async getTop10MusicForlastDay() {
    const oneDay = new Date();
    oneDay.setMonth((oneDay).getDate() - 1);
    return await this.musicRepo.getTop10Music(oneDay)

  }

  async updateMusic(
    id:number,
    updateMusicDto: UpdateMusicDto,
    photoFile?: Express.Multer.File,
    audioFile?: Express.Multer.File,
    userId?: number
  ): Promise<MusicEntity> {

    const { name, authorName } = updateMusicDto;

    const music = await this.musicRepo.findOne(id)
    if(!music) throw new NotFoundException(`music with id ${id} not found`)
        
    const author = await this.authorRepository.getAuthorByName(authorName)
    if(!author) throw new NotFoundException(`author with name ${ authorName} not found`)

    if(photoFile) {
      const photoUploadResponse = await this.s3Service.saveS3(photoFile.originalname, photoFile.buffer, photoFile.mimetype, S3Type.PHOTO, userId);
      music.photo = photoUploadResponse;  

    }
    if(audioFile) {
       const audioUploadResponse = await this.s3Service.saveS3(audioFile.originalname, audioFile.buffer, audioFile.mimetype, S3Type.AUDIO, userId);
       music.audio = audioUploadResponse;  

    }
  
    music.name = name;
    music.authorName = authorName
    music.author = author  

    return await this.musicRepo.save(music);
  }

  async remove(id: number) {
    return await this.musicRepo.remove(id);
  }
}

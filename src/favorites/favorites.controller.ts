import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FavoriteProductDto } from './dto/favorite-product.dto';
import { Favorite } from './entities/favorite.entity';
import { FavoritesService } from './favorites.service';

@ApiTags('favorites')
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  favoriteProduct(@Body() dto: FavoriteProductDto): Promise<Favorite> {
    return this.favoritesService.favoriteProduct(dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  unfavoriteProduct(@Param('id') id: string) {
    return this.favoritesService.unfavoriteProduct(id);
  }

  @Get('user/:id')
  getUserFavorites(@Param('id') id: string): Promise<Favorite[]> {
    return this.favoritesService.getUserFavorites(id);
  }

  @Get('product/:id')
  getUsersWhoFavoritedProduct(@Param('id') id: string) {
    return this.favoritesService.getUsersWhoFavoritedProduct(id);
  }
}

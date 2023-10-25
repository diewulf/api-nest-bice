import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Redeem } from '../domain/redeem.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RedeemService {

  constructor(
    @InjectRepository(Redeem, "postgresConnection")
    private readonly redeemRepository: Repository<Redeem>,
  ) { }

  async getRedeem(id: number): Promise<Redeem> {
    const stored = await this.redeemRepository.findOneBy({
      id: id
    })
    if (!stored) {
      throw new NotFoundException(`no existe canje con id  ${id}`);
    }
    return stored;
  }

  async getRedeemByUuid(uuid: string): Promise<Redeem> {
    const stored = await this.redeemRepository.findOneBy({ uuid })
    if (!stored) {
      throw new NotFoundException(`no existe canje con uuid  ${uuid}`);
    }
    return stored;
  }



}
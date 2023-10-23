import { RedeemDto } from "./dto/redeem-in.dto";

export interface RedeemRepositoryInterface {
  useCanje( redeemDto: RedeemDto ): Promise<void>;
}
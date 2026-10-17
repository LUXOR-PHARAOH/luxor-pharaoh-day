export type VerificationStatus='VERIFIED'|'ESTIMATED'|'NEEDS_REVIEW';
export type Site={id:string;title:string;arabicTitle:string;hours:string;price:{foreignAdult:number;foreignStudent:number;egyptianAdult:number;egyptianStudent:number};currency:string;source:string;sourceUrl:string;lastReviewed:string;status:VerificationStatus};

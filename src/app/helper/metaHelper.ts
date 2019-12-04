import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Injectable()
export class MetaHelper {
    constructor(meta: Meta) {
        
    }

    updateMeta() {

    }

    
}
export type MetaObj = {
    meta_title: string,
    meta_description: string,
    og_image: string,
    og_title: string,
    og_description: string,
    twitter_image: string,
    twitter_title: string,
    twitter_description: string,

}
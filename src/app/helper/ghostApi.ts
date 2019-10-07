import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { TransferState, makeStateKey } from "@angular/platform-browser";

@Injectable()
export class GhostApi {
  readonly host = "https://rkgaertringen.hyperleague.de/ghost/api/v2/content";
  readonly token = "400063becdc8344b52789110a5";
  pages: { [slug: string]: Post } = {};
  filteredPages: { [filter: string]: Post[] } = {};
  tags: { [tag: string]: Tag} = {};
  settings: Settings;

  readonly PAGE_KEY = makeStateKey("pages");
  readonly TAG_KEY = makeStateKey("tags");
  readonly TAG_PAGES_KEY = makeStateKey("tagPages");
  readonly SETTINGS_KEY = makeStateKey("settings");

  constructor(private http: HttpClient, private state: TransferState) {
    this.pages = this.state.get(this.PAGE_KEY, {});
    this.tags = this.state.get(this.SETTINGS_KEY, {});
    this.filteredPages = this.state.get(this.TAG_PAGES_KEY, {});
    this.settings = this.state.get(this.SETTINGS_KEY, undefined);
  }

  getPage(slug: string): Observable<Post> {
    if (this.pages[slug] != undefined) {
      return new Observable(observer => {
        observer.next(this.pages[slug]);
        observer.complete();
      });
    } else {
      return this.makeRequest("/posts/slug/" + slug + "/", ["include=tags"]).pipe(
        map(obj => {
          if (obj.posts && obj.posts.length > 0) {
            this.pages[slug] = obj.posts[0];
            this.state.onSerialize(this.PAGE_KEY, () => this.pages);
            return obj.posts[0];
          } else {
            return undefined;
          }
        })
      );
    }
  }

  getTag(tag: string): Observable<Tag> {
    if (this.tags[tag] != undefined) {
      return new Observable(observer => {
        observer.next(this.tags[tag]);
        observer.complete();
      });
    } else {
      return this.makeRequest("/tags/slug/" + tag + "/").pipe(
        map(obj => {
          if (obj.tags && obj.tags.length > 0) {
            this.tags[tag] = obj.tags[0];
            this.state.onSerialize(this.TAG_KEY, () => this.tags);

            return obj.tags[0];
          } else {
            return [];
          }
        })
      );
    }
  }

  getFilteredPages(filter: string): Observable<Post[]> {
    if (this.filteredPages[filter] != undefined) {
      return new Observable(observer => {
        observer.next(this.filteredPages[filter]);
        observer.complete();
      });
    } else {
      return this.makeRequest("/posts/", ["filter=" + escape(filter), "include=tags"]).pipe(
        map(obj => {
          if (obj.posts && obj.posts.length > 0) {
            console.log(obj);
            this.filteredPages[filter] = obj.posts;
            this.state.onSerialize(this.TAG_PAGES_KEY, () => this.filteredPages);
            obj.posts.forEach((post) => {
              this.pages[post.slug] = post;
            })
            this.state.onSerialize(this.PAGE_KEY, () => this.pages);

            return obj.posts;
          } else {
            return [];
          }
        })
      );
    }
  }

  getSettings(): Observable<Settings> {
    if (this.settings != undefined) return new Observable(observer => {
      observer.next(this.settings);
      observer.complete();
    });
    else return this.makeRequest("/settings/").pipe(map(obj => {
      if (obj.settings) {
        this.settings = obj.settings;
        this.state.onSerialize(this.SETTINGS_KEY, () => this.settings);
        return obj.settings;
      }
    }))
  }

  makeRequest(url, options?: string[]): Observable<any> {
    let parameters = "";
    if (options && options.length > 0) parameters = "&" + options.join("&");
    return this.http.get(this.host + url + "?key=" + this.token + parameters);
  }
}

export type Post = {
  slug: string,
  id: string,
  uuid: string,
  title: string,
  html: string,
  comment_id: string,
  feature_image: string,
  featured: boolean,
  meta_title: string,
  meta_description: string,
  created_at: string,
  updated_at: string,
  published_at: string,
  custom_excerpt: string,
  codeinjection_head: string,
  codeinjection_foot: string,
  og_image: string,
  og_title: string,
  og_description: string,
  twitter_image: string,
  twitter_title: string,
  twitter_description: string,
  custom_template: string,
  canonical_url: string,
  page: boolean,
  primary_author: string,
  primary_tag: {
    id: string,
    name: string,
    slug: string,
    description: string,
    feature_image: string,
    visibility: string,
    meta_title: string,
    meta_description: string,
    url: string
  },
  url: string,
  excerpt: string
}

export type Settings = {
  
  title: string,
  description: string,
  logo: string,
  icon: string,
  cover_image: string,
  facebook: string,
  twitter: string,
  lang: string,
  timezone: string,
  navigation: 
    {
      label: string,
      url: string
    }[]
  ,
  meta_title: string,
  meta_description: string,
  og_image: string,
  og_title: string,
  og_description: string,
  twitter_image: string,
  twitter_title: string,
  twitter_description: string,
  url: string,
  codeinjection_head: string,
  codeinjection_foot: string
}

export type Tag = {
  slug: string,
  id: string,
  name: string,
  description: string,
  feature_image: string,
  visibility: string,
  meta_title: string,
  meta_description: string,
  url: string
}
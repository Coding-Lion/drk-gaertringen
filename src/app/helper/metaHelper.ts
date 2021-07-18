import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Tag, Post, Settings } from './ghostApi';
import { LinkService } from './linkService';
import { ScriptService } from './scriptService';

@Injectable()
export class MetaHelper {
    constructor(private meta: Meta, private link: LinkService, private script: ScriptService) {
        
    }

    updateMainMeta(data: Settings) {
        this.meta.updateTag({ name: "description", content: data.meta_description });
        this.meta.updateTag({ property: "og:type", content: "website" });
        this.meta.updateTag({ property: "og:title", content: data.meta_title || data.title });
        this.meta.updateTag({ property: "og:description", content: data.meta_description });
        this.meta.updateTag({ property: "og:url", content: data.url });
        this.meta.updateTag({ property: "og:image", content: data.cover_image });
        this.meta.updateTag({ name: "twitter:card", content: "summary_large_image" });
        this.meta.updateTag({ name: "twitter:title", content: data.meta_title || data.title });
        this.meta.updateTag({ name: "twitter:description", content: data.meta_description });
        this.meta.updateTag({ name: "twitter:url", content: data.url });
        this.meta.updateTag({ name: "twitter:image", content: data.cover_image });
        this.meta.updateTag({ property: "article:publisher", content: data.facebook });

        try {
            this.script.removeTag("type='application/ld+json'");
            // this.link.removeTag("rel='amphtml'");
            this.link.removeTag("rel='canonical'");
            this.meta.removeTag("property='article:published_time'");
            this.meta.removeTag("property='article:modified_time'");
            this.meta.removeTag("property='article:tag'");
        } catch (error) {
            
        }

    }

    updateTagMeta(data: Tag) {
        this.meta.updateTag({ name: "description", content: data.meta_description });
        this.meta.updateTag({ property: "og:type", content: "website" });
        this.meta.updateTag({ property: "og:title", content: data.meta_title });
        this.meta.updateTag({ property: "og:description", content: data.meta_description });
        this.meta.updateTag({ property: "og:url", content: data.url });
        this.meta.updateTag({ property: "og:image", content: data.feature_image });
        this.meta.updateTag({ name: "twitter:card", content: "summary_large_image" });
        this.meta.updateTag({ name: "twitter:title", content: data.meta_title });
        this.meta.updateTag({ name: "twitter:description", content: data.meta_description });
        this.meta.updateTag({ name: "twitter:url", content: data.url });
        this.meta.updateTag({ name: "twitter:image", content: data.feature_image });
        try {
            this.script.removeTag("type='application/ld+json'");
            // this.link.removeTag("rel='amphtml'");
            this.link.removeTag("rel='canonical'");
            this.meta.removeTag("property='article:published_time'");
            this.meta.removeTag("property='article:modified_time'");
            this.meta.removeTag("property='article:tag'");
        } catch (error) {
            
        }
    }

    updatePageMeta(data: Post, settings: Settings) {
        this.meta.updateTag({ name: "description", content: data.meta_description || data.excerpt });
        this.meta.updateTag({ property: "og:site_name", content: settings.title });
        this.meta.updateTag({ property: "og:type", content: "article" });
        this.meta.updateTag({ property: "og:title", content: data.meta_title || data.title });
        this.meta.updateTag({ property: "og:description", content: data.custom_excerpt || data.excerpt });
        this.meta.updateTag({ property: "og:url", content: data.url });
        this.meta.updateTag({ property: "article:published_time", content: data.published_at });
        this.meta.updateTag({ property: "article:modified_time", content: data.updated_at });
        this.meta.updateTag({ property: "article:tag", content: data.title });
        this.meta.updateTag({ name: "twitter:card", content: "summary_large_image" });
        this.meta.updateTag({ name: "twitter:title", content: data.twitter_title || data.meta_title || data.title });
        this.meta.updateTag({ name: "twitter:description", content: data.twitter_description || data.custom_excerpt || data.excerpt });
        this.meta.updateTag({ name: "twitter:url", content: data.url });
        this.meta.updateTag({ name: "twitter:image", content: data.feature_image });
        try {
            this.script.removeTag("type='application/ld+json'");
            // this.link.removeTag("rel='amphtml'");
            this.link.removeTag("rel='canonical'");
        } catch (error) {
            
        }
        // this.link.addTag({ rel: "amphtml", href: data.url + "amp/"})
        this.link.addTag({ rel: "canonical", href: data.url })
        this.script.addTag({ type: "application/ld+json" }, JSON.stringify(
            {
                "@context": "https://schema.org",
                "@type": "Article",
                "publisher": {
                    "@type": "Organization",
                    "name": settings.title,
                    "logo": {
                        "@type": "ImageObject",
                        url: settings.logo
                    },
                },
                "headline": data.meta_title || data.title,
                "url": data.url,
                "datePublished": data.published_at,
                "dateModified": data.updated_at,
                "image": {
                    "@type": "ImageObject",
                    "url": data.feature_image,
                    "width": 2000,
                    "height": 1128
                },
                "keywords": data.title,
                "description": data.custom_excerpt || data.excerpt,
                "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": settings.url
                },
                "author": {
                    "@type": "Person",
                    "name": data.primary_author.name,
                    "url": settings.url,
                    "sameAs": []
                },

            }
        ));

        
    }
}
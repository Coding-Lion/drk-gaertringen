import { Component } from "@angular/compiler/src/core";

export const css = {
  styles: [
    `
//     p {
//         margin: 0;
//         padding: 0;
//     }

//     .post-template .site-main,
//     .page-template .site-main {
//         padding-bottom: 4vw;
//         background: #fff;
//     }
    
//     .post-full {
//         position: relative;
//         z-index: 50;
//     }
//     /* ^ Required to make .post-full-content:before/after z-index stacking work */
    
//     .post-full-header {
//         margin: 0 auto;
//         padding: 6vw 3vw 3vw;
//         max-width: 1040px;
//         text-align: center;
//     }
//     @media (max-width: 500px) {
//         .post-full-header {
//             padding: 14vw 3vw 10vw;
//         }
//     }
    
//     .post-full-meta {
//         display: flex;
//         justify-content: center;
//         align-items: center;
//         color: var(--midgrey);
//         font-size: 1.4rem;
//         font-weight: 600;
//         text-transform: uppercase;
//     }
    
//     .post-full-meta-date {
//         color: var(--blue);
//     }
    
//     .post-full-title {
//         margin: 0;
//         color: color(var(--darkgrey) l(-5%));
//     }
    
//     .date-divider {
//         display: inline-block;
//         margin: 0 6px 1px;
//     }
    
//     .post-full-image {
//         margin: 0 0 -165px;
//         background: var(--lightgrey) center center;
//         border-radius: 5px;
//         overflow: hidden;
//     }
    
//     .post-full-image img {
//         width: 100%;
//         height: 800px;
//         object-fit: cover;
//     }
    
//     @media (max-width: 1170px) {
//         .post-full-image {
//             margin: 0 -4vw -100px;
//             border-radius: 0;
//         }
//         .post-full-image img {
//             height: 600px;
//         }
//     }
    
//     @media (max-width: 800px) {
//         .post-full-image img {
//             height: 400px;
//         }
//     }
    
//     .post-full-content {
//         position: relative;
//         margin: 0 auto;
//         padding: 70px 100px 0;
//         min-height: 230px;
//         font-size: 1.5em;
//         line-height: 1.6em;
//         background: #fff;
//     }
    
//     @media (max-width: 1170px) {
//         .post-full-content {
//             padding: 5vw 7vw 0;
//         }
//     }
//     @media (max-width: 800px) {
//         .post-full-content {
//             font-size: 1.9rem;
//         }
//     }
    
//     .post-full-content:before {
//         content: "";
//         position: absolute;
//         top: 15px;
//         left: -5px;
//         z-index: -1;
//         display: block;
//         width: 20px;
//         height: 200px;
//         background: rgba(39,44,49,0.15);
//         filter: blur(5px);
//         transform: rotate(-5deg);
//     }
    
//     .post-full-content:after {
//         content: "";
//         position: absolute;
//         top: 15px;
//         right: -5px;
//         z-index: -1;
//         display: block;
//         width: 20px;
//         height: 200px;
//         background: rgba(39,44,49,0.15);
//         filter: blur(5px);
//         transform: rotate(5deg);
//     }
    
//     .no-image .post-full-content {
//         padding-top: 0;
//     }
    
//     .no-image .post-full-content:before,
//     .no-image .post-full-content:after {
//         display: none;
//     }
    
//     .post-full-content h1,
//     .post-full-content h2,
//     .post-full-content h3,
//     .post-full-content h4,
//     .post-full-content h5,
//     .post-full-content h6,
//     .post-full-content p,
//     .post-full-content ul,
//     .post-full-content ol,
//     .post-full-content dl,
//     .post-full-content pre,
//     .post-full-content blockquote,
//     .post-full-comments,
//     .footnotes {
//         min-width: 100%;
//     }

//     .post-full-content h1,
//     .post-full-content h2,
//     .post-full-content h3,
//     .post-full-content h4,
//     .post-full-content h5,
//     .post-full-content h6 {
//         line-height: initial;

//     }
    
//     .post-full-content li {
//         word-break: break-word;
//     }
    
//     .post-full-content li p {
//         margin: 0;
//     }
    
//     .post-full-content a {
//         /*color: #000;*/
//         word-break: break-word;
//         box-shadow: var(--blue) 0 -1px 0 inset;
//     }
    
//     .post-full-content a:hover {
//         /*color: var(--blue);*/
//         text-decoration: none;
//     }
    
//     .post-full-content strong,
//     .post-full-content em {
//         color: color(var(--darkgrey) l(-5%));
//     }
    
//     .post-full-content small {
//         display: inline-block;
//         line-height: 1.6em;
//     }
    
//     .post-full-content li:first-child {
//         margin-top: 0;
//     }
    
//     .post-full-content img,
//     .post-full-content video {
//         display: block;
//         margin: 1.5em auto;
//         max-width: 1040px;
//         height: auto;
//     }
//     @media (max-width: 1040px) {
//         .post-full-content img,
//         .post-full-content video {
//             width: 100%;
//         }
//     }
    
    
//     /* Full bleed images (#full)
//     Super neat trick courtesy of @JoelDrapper
//     Usage (In Ghost edtior):
//     ![img](/some/image.jpg#full)
//     */
//     .post-full-content img[src$="#full"] {
//         max-width: none;
//         width: 100vw;
//     }
    
    
//     /* Image captions
//     Usage (In Ghost editor):
//     ![img](/some/image.jpg)
//     <small>Your image caption</small>
//     */
//     .post-full-content img + br + small {
//         display: block;
//         margin-top: -3em;
//         margin-bottom: 1.5em;
//         text-align: center;
//     }
    
    
//     /* Override third party iframe styles */
//     .post-full-content iframe {
//         margin: 0 auto !important;
//     }
    
//     .post-full-content blockquote {
//         margin: 0 0 1.5em;
//         padding: 0 1.5em;
//         border-left: #3eb0ef 3px solid;
//     }
    
//     .post-full-content blockquote p {
//         margin: 0 0 1em 0;
//         color: inherit;
//         font-size: inherit;
//         line-height: inherit;
//         font-style: italic;
//     }
    
//     .post-full-content blockquote p:last-child {
//         margin-bottom: 0;
//     }
    
//     .post-full-content code {
//         padding: 0 5px 2px;
//         font-size: 0.8em;
//         line-height: 1em;
//         font-weight: 400!important;
//         background: var(--whitegrey);
//         border-radius: 3px;
//     }
    
//     .post-full-content p code {
//         word-break: break-all;
//     }
    
//     .post-full-content pre {
//         overflow-x: auto;
//         margin: 1.5em 0 3em;
//         padding: 20px;
//         max-width: 100%;
//         border: color(var(--darkgrey) l(-10%)) 1px solid;
//         color: var(--whitegrey);
//         font-size: 1.4rem;
//         line-height: 1.5em;
//         background: color(var(--darkgrey) l(-3%));
//         border-radius: 5px;
//     }
    
//     .post-full-content pre ::selection {
//         color: color(var(--midgrey) l(-25%));
//     }
    
//     .post-full-content pre code {
//         padding: 0;
//         font-size: inherit;
//         line-height: inherit;
//         background: transparent;
//     }
    
//     .post-full-content pre code :not(span) {
//         color: inherit;
//     }
    
//     .post-full-content .fluid-width-video-wrapper {
//         margin: 1.5em 0 3em;
//     }
    
//     .post-full-content hr {
//         margin: 4vw 0;
//     }
    
//     .post-full-content hr:after {
//         content: "";
//         position: absolute;
//         top: -15px;
//         left: 50%;
//         display: block;
//         margin-left: -10px;
//         width: 1px;
//         height: 30px;
//         background: color(var(--lightgrey) l(+10%));
//         box-shadow: #fff 0 0 0 5px;
//         transform: rotate(45deg);
//     }
    
    
//     .post-full-content h1 {
//         margin: 0.5em 0 0.2em 0;
//         font-size: 4.6rem;
//         font-weight: 200;
//     }
//     @media (max-width: 500px) {
//         .post-full-content h1 {
//             font-size: 2.8rem;
//         }
//     }
    
//     .post-full-content h2 {
//         margin: 0.5em 0 0.2em 0;
//         font-size: 2.8rem;
//         font-weight: 200;
//     }
//     @media (max-width: 500px) {
//         .post-full-content h2 {
//             font-size: 2.6rem;
//         }
//     }
    
//     .post-full-content h3 {
//         margin: 0.5em 0 0.2em 0;
//         font-size: 2.8rem;
//         font-weight: 200;
//     }
//     @media (max-width: 500px) {
//         .post-full-content h3 {
//             font-size: 2.2rem;
//         }
//     }
    
//     .post-full-content h4 {
//         margin: 0.5em 0 0.2em 0;
//         font-size: 2.8rem;
//         font-weight: 200;
//     }
//     @media (max-width: 500px) {
//         .post-full-content h4 {
//             font-size: 2.2rem;
//         }
//     }
    
//     .post-full-content h5 {
//         display: block;
//         margin: 0.5em 0;
//         padding: 1em 0 1.5em;
//         border: 0;
//         color: var(--blue);
//         font-family: Georgia,serif;
//         font-size: 3.2rem;
//         line-height: 1.35em;
//         text-align: center;
//     }
//     @media (min-width: 1180px) {
//         .post-full-content h5 {
//             max-width: 1060px;
//             width: 100vw;
//         }
//     }
//     @media (max-width: 500px) {
//         .post-full-content h5 {
//             padding: 0 0 0.5em;
//             font-size: 2.2rem;
//         }
//     }
    
//     .post-full-content h6 {
//         margin: 0.5em 0 0.2em 0;
//         font-size: 2.3rem;
//         font-weight: 200;
//     }
//     @media (max-width: 500px) {
//         .post-full-content h6 {
//             font-size: 2rem;
//         }
//     }
    
//     .footnotes-sep {
//         margin-bottom: 30px;
//     }
    
//     .footnotes {
//         font-size: 1.5rem;
//     }
    
//     .footnotes p {
//         margin: 0;
//     }
    
//     .footnote-backref {
//         color: var(--blue) !important;
//         font-size: 1.2rem;
//         font-weight: bold;
//         text-decoration: none !important;
//         box-shadow: none !important;
//     }
    
//     /* Some grouped styles for smaller viewports */
//     @media (max-width: 500px) {
//         .post-full-meta {
//             font-size: 1.2rem;
//             line-height: 1.3em;
//         }
//         .post-full-title {
//             font-size: 2.9rem;
//         }
//         .post-full-image {
//             margin-bottom: 4vw;
//             height: 350px;
//         }
//         .post-full-content {
//             padding: 0;
//         }
//         .post-full-content:before,
//         .post-full-content:after {
//             display: none;
//         }
//     }
    
//     /* Tables */
//     .post-full-content table {
//         display: inline-block;
//         overflow-x: auto;
//         margin: 0.5em 0 2.5em;
//         max-width: 100%;
//         width: auto;
//         border-spacing: 0;
//         border-collapse: collapse;
//         font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
//         font-size: 1.6rem;
//         white-space: nowrap;
//         vertical-align: top;
//     }
    
//     .post-full-content table {
//         -webkit-overflow-scrolling: touch;
//         background: radial-gradient(ellipse at left, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 75%) 0 center, radial-gradient(ellipse at right, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 75%) 100% center;
//         background-attachment: scroll, scroll;
//         background-size: 10px 100%, 10px 100%;
//         background-repeat: no-repeat;
//     }
    
//     .post-full-content table td:first-child {
//         background-image: linear-gradient(to right, rgba(255,255,255, 1) 50%, rgba(255,255,255, 0) 100%);
//         background-size: 20px 100%;
//         background-repeat: no-repeat;
//     }
    
//     .post-full-content table td:last-child {
//         background-image: linear-gradient(to left, rgba(255,255,255, 1) 50%, rgba(255,255,255, 0) 100%);
//         background-position: 100% 0;
//         background-size: 20px 100%;
//         background-repeat: no-repeat;
//     }
    
//     .post-full-content table th {
//         color: var(--darkgrey);
//         font-size: 1.2rem;
//         font-weight: 700;
//         letter-spacing: 0.2px;
//         text-align: left;
//         text-transform: uppercase;
//         background-color: color(var(--whitegrey) l(+4%));
//     }
    
//     .post-full-content table th,
//     .post-full-content table td {
//         padding: 6px 12px;
//         border: color(var(--whitegrey) l(-1%) s(-5%)) 1px solid;
//     }










    
// .post-content {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     max-width: 920px;
// }

// .post-template .post-content > p:first-child {
//     font-size: 1.25em;
//     line-height: 1.5em;
// }

// .post-full-content .kg-image {
//     max-width: 100%;
// }

// /* Preventing full-width image overlap with post image.  */
// .post-full-image + .post-full-content .kg-content *:first-child .kg-image {
//     width: 100%;
// }

// .post-full-content .kg-width-wide .kg-image {
//     max-width: 1040px;
// }

// .post-full-content .kg-width-full .kg-image {
//     max-width: 100vw;
// }

// .post-full-content figure {
//     margin: 1.5em 0 3em;
// }

// .post-full-content figure img {
//     margin: 0;
// }

// .post-full-content figcaption {
//     margin: 1.0em 0 0;
//     font-size: 80%;
//     line-height: 1.6em;
//     text-align: center;
// }

// .kg-width-full figcaption {
//     padding: 0 1.5em;
// }

// .kg-embed-card {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     width: 100%;
// }

// .kg-embed-card .fluid-width-video-wrapper {
//     margin: 0;
// }


// @media (max-width: 1040px) {
//     .post-full-content .kg-width-full .kg-image {
//         width: 100vw;
//     }
// }

// .kg-gallery-container {
//     display: flex;
//     flex-direction: column;
//     max-width: 1040px;
//     width: 100vw;
// }

// .kg-gallery-row {
//     display: flex;
//     flex-direction: row;
//     justify-content: center;
// }

// .kg-gallery-image img {
//     display: block;
//     margin: 0;
//     width: 100%;
//     height: 100%;
// }

// .kg-gallery-row:not(:first-of-type) {
//     margin: 0.75em 0 0 0;
// }

// .kg-gallery-image:not(:first-of-type) {
//     margin: 0 0 0 0.75em;
// }

// .kg-gallery-card + .kg-image-card.kg-width-wide,
// .kg-gallery-card + .kg-gallery-card,
// .kg-image-card.kg-width-wide + .kg-gallery-card,
// .kg-image-card.kg-width-wide + .kg-image-card.kg-width-wide {
//     margin: -2.25em 0 3em;
// }

// /* keep existing <pre> styles for code cards with captions */
// .kg-code-card {
//     min-width: 100%;
// }

// .kg-code-card pre {
//     margin: 0;
// }

// .kg-bookmark-card {
//     background: var(--white);
//     width: 100%;
// }

// .kg-card + .kg-bookmark-card {
//     margin-top: 0;
// }

// .post-full-content .kg-bookmark-container {
//     display: flex;
//     font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
//     color: var(--darkgrey);
//     text-decoration: none;
//     min-height: 148px;
//     box-shadow: 0px 2px 5px -1px rgba(0, 0, 0, 0.15), 0 0 1px rgba(0, 0, 0, 0.09);
//     border-radius: 3px;
// }

// .kg-bookmark-content {
//     display: flex;
//     flex-direction: column;
//     flex-grow: 1;
//     align-items: flex-start;
//     justify-content: start;
//     padding: 20px;
// }

// .kg-bookmark-title {
//     font-size: 1.6rem;
//     line-height: 1.5em;
//     font-weight: 600;
//     color: color(var(--midgrey) l(-30%));
// }

// .post-full-content .kg-bookmark-container:hover .kg-bookmark-title {
//     color: var(--blue);
// }

// .kg-bookmark-description {
//     display: -webkit-box;
//     font-size: 1.5rem;
//     line-height: 1.5em;
//     color: color(var(--midgrey) l(-10%));
//     font-weight: 400;
//     margin-top: 12px;
//     max-height: 48px;
//     overflow-y: hidden;
//     -webkit-line-clamp: 2;
//     -webkit-box-orient: vertical;
// }

// .kg-bookmark-thumbnail {
//     position: relative;
//     min-width: 33%;
//     max-height: 100%;
// }

// .kg-bookmark-thumbnail img {
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
//     border-radius: 0 3px 3px 0;
// }

// .kg-bookmark-metadata {
//     display: flex;
//     align-items: center;
//     font-size: 1.5rem;
//     font-weight: 400;
//     color: color(var(--midgrey) l(-10%));
//     margin-top: 14px;
//     flex-wrap: wrap;
// }

// .post-full-content .kg-bookmark-icon {
//     width: 22px;
//     height: 22px;
//     margin-right: 8px;
// }

// .kg-bookmark-author {
//     line-height: 1.5em;
// }

// .kg-bookmark-author:after {
//     content: "•";
//     margin: 0 6px;
// }

// .kg-bookmark-publisher {
//     overflow: hidden;
//     line-height: 1.5em;
//     text-overflow: ellipsis;
//     white-space: nowrap;
//     max-width: 240px;
// }

// @media (max-width: 500px) {
//     .post-full-content .kg-bookmark-container {
//         flex-direction: column;
//     }

//     .kg-bookmark-thumbnail {
//         order: 1;
//         width: 100%;
//         min-height: 160px;
//     }

//     .kg-bookmark-thumbnail img {
//         border-radius: 3px 3px 0 0;
//     }

//     .kg-bookmark-content {
//         order: 2
//     }
// }



    


    `
  ]
};

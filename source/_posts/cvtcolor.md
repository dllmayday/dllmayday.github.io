---
title: 颜色转换
permalink: 
categories: 实用技巧
tags: Color
description: 
image: 
copyright: true     //增加底部的版权信息（需要配置）
date: 2024-02-20 16:53:20
---

misc colorspace conversion functions


<!--more-->
```
/*****************************************************************************
 * colorspace.c: misc colorspace conversion functions
 *****************************************************************************
 * $Id: colorspace.c,v 1.16 2005/08/11 23:25:01 pingus77 Exp $
 *****************************************************************************
 * Copyright (C) 1998 Gerd Knorr <kraxel@cs.tu-berlin.de>
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA  02111, USA.
 *****************************************************************************
 *
 * misc colorspace conversion functions
 *
 *****************************************************************************/
#include "config.h"
#include <stdlib.h>
#include <string.h>
#include <stdio.h>
#include <unistd.h>
#include "colorspace.h"
#include "memcpy.h"
#include "strtab.h"
extern int debug;

struct STRTAB video_fmt_names[] = {
  {VIDEO_RGB03,"rgb3"},
  {VIDEO_RGB04b,"rgb4b"},
  {VIDEO_RGB08,"rgb8"},
  {VIDEO_RGB08b,"rgb8b"},
  {VIDEO_RGB15,"rgb15"},
  {VIDEO_RGB16,"rgb16"},
  {VIDEO_RGB24,"rgb24"},
  {VIDEO_RGB24B,"rgb24b"},
  {VIDEO_RGB32,"rgb32"},
  {VIDEO_RGB32B,"rgb32b"},
  {VIDEO_RGB32P,"rgb32p"},
  {VIDEO_RGB15X,"rgb15x"},
  {VIDEO_RGB16X,"rgb16x"},
  {VIDEO_RGB24X,"rgb24x"},
  {VIDEO_RGB32X,"rgb32x"},
  {VIDEO_RGB32PX,"rgb32px"},
  {VIDEO_HI240,"hi240"},
  {VIDEO_GRAY1,"gray1"},
  {VIDEO_GRAY1X,"gray1x"},
  {VIDEO_GRAY4,"gray4"},
  {VIDEO_GRAY8,"gray8"},
  {VIDEO_YUYV, "yuyv"},
  {VIDEO_UYVY, "uyvy"},
  {VIDEO_YUV420,"yuv420"},
  {VIDEO_YVU420,"yvu420"},
  {VIDEO_Y41P, "y41p"},
  {VIDEO_YVU410, "yvu410"},
  {VIDEO_YUV410, "yuv410"},
  {VIDEO_YUV422P, "yuv422p"},
  {VIDEO_YUV411P, "yuv411p"},
  {VIDEO_NV12, "nv12"},
  {-1, NULL}
};

static void
rgb4b_to_rgb32 (unsigned char *dest, unsigned char *s, int w, int h)
{
  int i, *d = (int *)dest;
  for (i=w*h; i>0; i--, d++, s++) {
    unsigned int c=*s;
    *d = ((c & 0x3) << (16+6)) | (((c >> 2)&0x1) << (8+7)) | (c>>3<<7);
  }
}

static void
rgb32_to_rgb4b (unsigned char *d, unsigned char *src, int w, int h)
{
  int i, *s = (int *)src;
  for (i=w*h; i>0; i--, d++, s++) {
    unsigned int c=*s;
    *d = (c>>(16+6)) | ((c&0xFF00)>>(8+7)<<2) | ((c & 0xFF)>>7<<3);
  }
}

static void
rgb8b_to_rgb32 (unsigned char *dest, unsigned char *s, int w, int h)
{
  int i, *d = (int *)dest;
  for (i=w*h; i>0; i--, d++, s++) {
    unsigned int c=*s;
    *d = ((c & 0x7) << (16+5)) | (((c >> 3)&0x7) << (8+5)) | (c>>6<<6);
  }
}

static void
rgb32_to_rgb8b (unsigned char *d, unsigned char *src, int w, int h)
{
  int i, *s = (int *)src;
  for (i=w*h; i>0; i--, d++, s++) {
    unsigned int c=*s;
    *d = (c>>(16+5)) | ((c&0xFF00)>>(8+5)<<3) | ((c & 0xFF)>>6<<6);
  }
}

static void
rgb8_to_rgb32 (unsigned char *dest, unsigned char *s, int w, int h)
{
  int i, *d = (int *)dest;
  for (i=w*h; i>0; i--, d++, s++) {
    unsigned int c=*s;
    *d = ((c >> 6) << (16+6)) | (((c >> 3)&0x7) << (8+5)) | ((c & 0x7) << 5);
  }
}

static void
rgb32_to_rgb8 (unsigned char *d, unsigned char *src, int w, int h)
{
  int i, *s = (int *)src;
  for (i=w*h; i>0; i--, d++, s++) {
    unsigned int c=*s;
    *d = ((c>>(16+6))<<6) | ((c&0xFF00)>>(8+5)<<3) | ((c & 0xFF)>>5);
  }
}

static void
rgb15_to_rgb32 (unsigned char *dest, unsigned char *src, int w, int h)
{
  int i, *d = (int *)dest;
  short *s = (short *)src;
  for (i=w*h; i>0; i--, d++, s++) {
    unsigned int c=*s;
    *d = ((c >> 10) << (16+3)) | (((c >> 5)&0x1F) << (8+3)) | ((c & 0x1F) << 3);
  }
}

static void
rgb32_to_rgb15 (unsigned char *dest, unsigned char *src, int w, int h)
{
  int i, *s = (int *)src;
  short *d = (short *)dest;
  for (i=w*h; i>0; i--, d++, s++) {
    unsigned int c=*s;
    *d = ((c>>(16+3))<<10) | ((c&0xFF00)>>(8+3)<<5) | ((c & 0xFF)>>3);
  }
}

static void
rgb16_to_rgb32 (unsigned char *dest, unsigned char *src, int w, int h)
{
  int i, *d = (int *)dest;
  short *s = (short *)src;
  for (i=w*h; i>0; i--, d++, s++) {
    unsigned int c=*s;
    *d = ((c >> 11) << (16+3)) | (((c >> 5)&0x3F) << (8+2)) | ((c & 0x1F) << 3);
  }
}

static void
rgb32_to_rgb16 (unsigned char *dest, unsigned char *src, int w, int h)
{
  int i, *s = (int *)src;
  short *d = (short *)dest;
  for (i=w*h; i>0; i--, d++, s++) {
    unsigned int c=*s;
    *d = ((c>>(16+3))<<11) | ((c&0xFF00)>>(8+2)<<5) | ((c & 0xFF)>>3);
  }
}

static void
rgb24_to_rgb32 (unsigned char *dest, unsigned char *src, int w, int h)
{
  int i = w * h;

  while (i--)
    {
#ifdef WORDS_BIGENDIAN
      *(dest++) = 0;
#endif
      *(dest++) = *(src++);
      *(dest++) = *(src++);
      *(dest++) = *(src++);
#ifndef WORDS_BIGENDIAN
      *(dest++) = 0;
#endif
    }
}

static void
rgb32_to_rgb24 (unsigned char *dest, unsigned char *src, int w, int h)
{
  int i = w * h;

  while (i--)
    {
#ifdef WORDS_BIGENDIAN
      src++;
#endif
      *(dest++) = *(src++);
      *(dest++) = *(src++);
      *(dest++) = *(src++);
#ifndef WORDS_BIGENDIAN
      src++;
#endif
    }
}

static void gray1_to_gray8(unsigned char *d, unsigned char *s, int w, int h) {
   int x,y,z,dpad=((w+31)/32*4-w/8);
  /* the width must be multiple of 32, 
     (just assumed to be multiple of 4 in xdtv, see x11.c) */
  for(y=h;y>0;y--) {
    for(x=w;x>7;x-=8,s++,d+=8)
      for(z=0;z<8;z++)
#ifdef WORDS_BIGENDIAN
    d[z]=(*s&(1<<(8-z)))?255:0;
#else
        d[z]=(*s&(1<<z))?255:0;
#endif
    s+=dpad;
  }
}

static void gray8_to_gray1(unsigned char *d, unsigned char *s, int w, int h) {
  int x,y,dpad=((w+31)/32*4-w/8);
  /* the width must be multiple of 32, 
     (just assumed to be multiple of 4 in xdtv, see x11.c) */
  for(y=h;y>0;y--) {
    for(x=w;x>7;x-=8,d++,s+=8)
#ifdef WORDS_BIGENDIAN
      *d=(s[7]>>7)|(s[6]>>7<<1)|(s[5]>>7<<2)|(s[4]>>7<<3)|(s[3]>>7<<4)|(s[2]>>7<<5)
    |(s[1]>>7<<6)|(s[0]>>7<<7);
#else
      *d=(s[0]>>7)|(s[1]>>7<<1)|(s[2]>>7<<2)|(s[3]>>7<<3)|(s[4]>>7<<4)|(s[5]>>7<<5)
    |(s[6]>>7<<6)|(s[7]>>7<<7);
#endif
    d+=dpad;
  }
}

static void gray4_to_gray8(unsigned char *d, unsigned char *s, int w, int h) {
  int i;
  for (i=w*h; i>0; i--, d++, s++) *d=*s<<4;
}

static void gray8_to_gray4(unsigned char *d, unsigned char *s, int w, int h) {
  int i;
  for (i=w*h; i>0; i--, d++, s++) *d=*s>>4;
}

static void yuv420_to_gray8(unsigned char *dest, unsigned char *src, int width, int height) {
  fast_memcpy(dest, src, width*height);
}

static void gray8_to_yuv420(unsigned char *dest, unsigned char *src, int width, int height) {
  int size=width*height;
  fast_memcpy(dest, src, size);
  dest+=size; size/=4; memset(dest, 128, size);
  dest+=size; memset(dest, 128, size);
}

/* rgb4 is xdtv-specific ! (just for fun :>)*/
static void rgb3_to_rgb32(unsigned char *dd, unsigned char *s, int w, int h) {
  unsigned int *d=(unsigned int *)dd;
  int i;
  for (i=w*h; i>0; i--, d++, s++)
    *d=((*s&1)<<(7-0))|((*s&2)<<(15-1))|((*s&4)<<(23-2));
}
static void rgb32_to_rgb3(unsigned char *d, unsigned char *ss, int w, int h) {
  unsigned int *s=(unsigned int *)ss;
  int i;
  for (i=w*h; i>0; i--, d++, s++)
    *d = ((s[0]>>7)&1)|(((s[0]>>15)&1)<<1)|(((s[0]>>23)&1)<<2);
}
  
static void hi240_to_rgb32(unsigned char *dest, unsigned char *src, int w, int h) {
  static int *rgb32_conv=NULL;
  int i;
  int *dest2=(int *)dest;
  if(rgb32_conv==NULL) {
    rgb32_conv=(int *) malloc(256*sizeof(int));
    for(i=0;i<225;i++) {
      int r=((i/5)%5)*255.0/4+0.5;
      int g=(i/25)*255.0/8+0.5;
      int b=(i%5)*255.0/4+0.5;
      rgb32_conv[16+i]=(b<<0)|(g<<8)|(r<<16);
    }
  }
  for(i=w*h;i>0;i--,dest2++,src++) *dest2=rgb32_conv[*src];
}

static void rgb32_to_hi240(unsigned char *d, unsigned char *s, int w, int h) {
  int i;
  for (i=w*h; i>0; i--, d++, s+=4) {
#ifdef WORDS_BIGENDIAN
    *d = 16 + s[3]/52 + s[1]/52*5 + s[2]/29*25;
#else
    *d = 16 + s[0]/52 + s[2]/52*5 + s[1]/29*25;
#endif
  }
}

static void yvu420_yuv420(unsigned char *d, unsigned char *s, int w, int h) {
  unsigned char *as, *bs, *ad, *bd;
  int t = w*h / 4;
  as = s + t*4;
  bs = as+ t;
  ad = d + t*4;
  bd = ad+ t;
  fast_memcpy(d,  s, t*4);
  fast_memcpy(ad, bs, t);
  fast_memcpy(bd, as, t);
}

static void rgb32_rgb32b(unsigned char *d, unsigned char *s, int w, int h) {
  int t = 4*w, y;
  s +=  t * (h - 1);
  for (y = h; y > 0; y--) { fast_memcpy(d, s, t); d += t; s -= t; }
}

static void rgb24_rgb24b(unsigned char *d, unsigned char *s, int w, int h) {
  int t = 3*w, y;
  s +=  t * (h - 1);
  for (y = h; y > 0; y--) { fast_memcpy(d, s, t); d += t; s -= t; }
}

static void swap1bpp32(unsigned char *dest, unsigned char *src, int w, int h) {
  int *d=(int *)dest,*s=(int *)src,ss,dd,i,j;
  for(i=w*h/32; i>0; i--,s++,d++) {
    ss=*s;dd=0;
    for(j=0;j<32;j++) if(ss&(1<<j)) dd|=(1<<(32-j));
    *d=dd;
  }
}

static void swap16bpp(unsigned char *d, unsigned char *s, int w, int h) {
  int i;
  //swab(d, s, 2*w*h);
  for(i=w*h; i>0; i--,s+=2,d+=2) { d[0]=s[1]; d[1]=s[0];}
}

static void swap24bpp(unsigned char *d, unsigned char *s, int w, int h) {
  int i;
  for(i=w*h; i>0; i--,s+=3,d+=3) { d[0]=s[2]; d[1]=s[1]; d[2]=s[0];}
}

static void swap32bpp(unsigned char *d, unsigned char *s, int w, int h) {
  int i;
  for(i=w*h; i>0; i--,s+=4,d+=4) { d[0]=s[3]; d[1]=s[2]; d[2]=s[1]; d[3]=s[0];}
}

void swap24(unsigned char *m, int t) {
  int i;
  unsigned char c;
  for(i=t; i>0; i--, m+=3) { c=m[0]; m[0]=m[2]; m[2]=c; } 
}

static void yuyv_to_yuv420 (unsigned char *d, unsigned char *s, int w, int h)
{
  int a, b;
  unsigned char *y, *u, *v;
  y = d;
  u = y + w * h;
  v = u + w * h / 4;

  for (a = h; a > 0; a -= 2)
    {
      for (b = w; b > 0; b -= 2)
        { *(y++) = *(s++); *(u++) = *(s++); *(y++) = *(s++); *(v++) = *(s++); }
      for (b = w; b > 0; b -= 2)
        { *(y++) = *(s++);  s++;  *(y++) = *(s++); s++; }
    }
}

        vx_imagepatch_addressing_t input_addr;
        vx_rectangle_t rect;
        vx_map_id input_id;
        void *input_ptr;

        rect.start_x = 0;
        rect.start_y = 0;
        rect.end_x = obj->input_image_width;
        rect.end_y = obj->input_image_height;
        vxMapImagePatch(obj->input_img[0], &rect, 0, &input_id, &input_addr, &input_ptr,
                        VX_READ_ONLY, VX_MEMORY_TYPE_HOST, VX_NOGAP_X);

        vx_imagepatch_addressing_t out_addr;
        vx_map_id out_id;
        void *out_ptr;

        rect.start_x = 0;
        rect.start_y = 0;
        rect.end_x = obj->output_image_width;
        rect.end_y = obj->output_image_height;
        vxMapImagePatch(obj->output_img[0], &rect, 0, &out_id, &out_addr, &out_ptr,
                        VX_WRITE_ONLY, VX_MEMORY_TYPE_HOST, VX_NOGAP_X);

        unsigned char *pin = input_ptr;
        unsigned char *pout = out_ptr;
        yuv420_to_uyvy()

static void yuv420_to_yuyv(unsigned char *d, unsigned char *s,int w, int h) 
{
  unsigned char *y,*u,*v,*u2,*v2;
  int a, b;
  y = s;
  u = y + w * h;
  v = u + w * h / 4;
  for (b = h; b > 0; b -= 2) {
    u2 = u; v2 = v;
    for (a = w; a > 0; a -= 2)
      { *(d++) = *(y++); *(d++) = *(u++); *(d++) = *(y++); *(d++) = *(v++);}
    u = u2; v = v2;
    for (a = w; a > 0; a -= 2)
      { *(d++) = *(y++); *(d++) = *(u++); *(d++) = *(y++); *(d++) = *(v++);}
  }
}

static void yuv420_to_uyvy(unsigned char *d, unsigned char *s,int w, int h) 
{
  unsigned char *y,*u,*v,*u2,*v2;
  int a, b;
  y = s;
  u = y + w * h;
  v = u + w * h / 4;
  for (b = h; b > 0; b -= 2) {
    u2 = u; v2 = v;
    for (a = w; a > 0; a -= 2)
    { 
        *(d++) = *(u++); 
        *(d++) = *(y++); 
        *(d++) = *(v++);
        *(d++) = *(y++); 
    }
    u = u2; v = v2;
    for (a = w; a > 0; a -= 2)
    { 
        *(d++) = *(u++); 
        *(d++) = *(y++); 
        *(d++) = *(v++);
        *(d++) = *(y++);  
    }
  }
}

static void yuv420_to_yuyv(unsigned char *d, unsigned char *s,int w, int h) {
  unsigned char *y,*u,*v,*u2,*v2;
  int a, b;
  y = s;
  u = y + w * h;
  v = u + w * h / 4;
  for (b = h; b > 0; b -= 2) {
    u2 = u; v2 = v;
    for (a = w; a > 0; a -= 2)
      { *(d++) = *(y++); *(d++) = *(u++); *(d++) = *(y++); *(d++) = *(v++);}
    u = u2; v = v2;
    for (a = w; a > 0; a -= 2)
      { *(d++) = *(y++); *(d++) = *(u++); *(d++) = *(y++); *(d++) = *(v++);}
  }
}

/* NOT VERIFIED */
/* w must be a multiple of 8 ! */
static void y41p_to_yuyv(unsigned char *d, unsigned char *s,int w, int h) {
  int i;
  for(i=w*h;i>0;i-=8,s+=12,d+=16) {
    d[5]=d[1]=s[0]; d[0]=s[1]; d[7]=d[3]=s[2]; d[2]=s[3]; d[9]=d[13]=s[4]; d[4]=s[5];
    d[11]=d[15]=s[6]; d[6]=s[7]; d[8]=s[8]; d[10]=s[9]; d[12]=s[10]; d[14]=s[11];
  }
}

/* NOT VERIFIED */
static void yuyv_to_y41p(unsigned char *d, unsigned char *s,int w, int h) {
  int i;
  for(i=w*h;i>0;i-=8,s+=16,d+=12) {
    d[0]=s[1]; d[1]=s[0];  d[2]=s[3];  d[3]=s[2];  d[4]=s[9];  d[5]=s[4]; 
    d[6]=s[11]; d[7]=s[6];  d[8]=s[8];  d[9]=s[10];  d[10]=s[12];  d[11]=s[14];
  } 
}

static void y410_to_y420(unsigned char *d, unsigned char *s,int w, int h) {
  int t=w*h, i, x, y, w4=w/4;
  fast_memcpy(d, s, t);
  s+=t; d+=t;
  for(i=2;i>0;i--)
    for(y=h;y>0;y-=4) {
      unsigned char *s0=s;
      for(x=w4;x>0;x--) {
    *(d++)=*s; *(d++)=*(s++);
      }
      s=s0;
      for(x=w4;x>0;x--) {
    *(d++)=*s; *(d++)=*(s++);
      }
    }
}

static void y420_to_y410(unsigned char *d, unsigned char *s,int w, int h) {
  int i, t=w*h, x, y, w4=w/4;
  fast_memcpy(d, s, t);
  s+=t; d+=t;
  for(i=2;i>0;i--)
    for(y=h;y>0;y-=4) {
      for(x=w4;x>0;x--) {
    *(d++)=*s; s+=2;
      }
      s+=2*w4;;
    }
}

static void yuyv_to_yuv422p (unsigned char *d, unsigned char *s, int w, int h) {
  int a, b;
  unsigned char *y, *u, *v;
  y = d;
  u = y + w * h;
  v = u + w * h / 2;
  for (a = h; a > 0; a--)
    for (b = w; b > 0; b -= 2)
      { *(y++) = *(s++); *(u++) = *(s++); *(y++) = *(s++); *(v++) = *(s++); }
}

static void yuv422p_to_yuyv(unsigned char *d, unsigned char *s,int w, int h) {
  unsigned char *y,*u,*v;
  int a, b;
  y = s;
  u = y + w * h;
  v = u + w * h / 2;
  for (b = h; b > 0; b --)
    for (a = w; a > 0; a -= 2)
      { *(d++) = *(y++); *(d++) = *(u++); *(d++) = *(y++); *(d++) = *(v++);}
}


static void yuv411p_to_yuv422p (unsigned char *d, unsigned char *s, int w, int h) {
  int i, t=w*h;
  fast_memcpy(d, s, t);
  d+=t; s+=t;
  for(i=t/2;i>0;i--) {
    *(d++)=*s; *(d++)=*(s++);
  }
}

static void yuv422p_to_yuv411p(unsigned char *d, unsigned char *s,int w, int h) {
  int i, t=w*h;
  fast_memcpy(d, s, t);
  d+=t; s+=t;
  for(i=t/2;i>0;i--) {
    *(d++)=*s; s+=2;
  }
}

/* NOT VERIFIED */
static void nv12_to_yuv420 (unsigned char *d, unsigned char *s, int w, int h) {
  int i, t=w*h;
  unsigned char *y, *u, *v;
  y = d;
  u = y + t;
  v = u + t / 4;
  fast_memcpy(d, s, t);
  s += t;
  for(i=t/4;i>0;i--) {
    *(u++)=*(s++); *(v++)=*(s++);
  }
}

/* NOT VERIFIED */
static void yuv420_to_nv12(unsigned char *d, unsigned char *s,int w, int h) {
  int i, t=w*h;
  unsigned char *y,*u,*v;
  y = s;
  u = y + t;
  v = u + t / 4;
  fast_memcpy(d, s, t);
  d += t;
  for(i=t/4;i>0;i--) {
    *(d++)=*(u++); *(d++)=*(v++);
  }
}



/******** RGB to YUV functions **********/
#ifdef WORDS_BIGENDIAN
#define RGBDO {s++; r=*(s++); g=*(s++); b=(*s++);}
#else
#define RGBDO {b=(*s++); g=*(s++); r=*(s++); s++;}
#endif
#define Y(r,g,b) (((16829*r+31913*g+6416*b)>>16)+16)
#define U(r,g,b) (((-9750*r-19148*g+28898*b)>>16)+128)
#define V(r,g,b) (((28898*r-24199*g-4699*b)>>16)+128)
static void rgb32_to_yuv420(unsigned char *d, unsigned char *s, int w, int h) {
  int aa, bb;
  unsigned char *y, *u, *v, r, g, b;
  y = d;
  u = y + w * h;
  v = u + w * h / 4;
  for (aa = h; aa > 0; aa -= 2) {
    for (bb = w; bb > 0; bb -= 2) {
      RGBDO; *(y++)=Y(r,g,b); *(u++)=U(r,g,b);
      RGBDO; *(y++)=Y(r,g,b);
    }
    for (bb = w; bb > 0; bb -= 2) {
      RGBDO; *(y++)=Y(r,g,b);
      RGBDO; *(y++)=Y(r,g,b); *(v++)=V(r,g,b);
    }
  }
}
static void rgb32_to_yuyv(unsigned char *d, unsigned char *s, int w, int h) {
  int i;
  for(i=w*h; i>0;i-=2,s+=8,d+=4) {
    unsigned char r,g,b;
#ifdef WORDS_BIGENDIAN
    r=s[1]; g=s[2]; b=s[3]; 
#else
    b=s[0]; g=s[1]; r=s[2]; 
#endif
    d[0] = Y(r,g,b); d[1] = U(r,g,b);
#ifdef WORDS_BIGENDIAN
    r=s[5]; g=s[6]; b=s[7]; 
#else
    b=s[4]; g=s[5]; r=s[6];
#endif
    d[2] = Y(r,g,b); d[3] = V(r,g,b);
  }
}

static void rgb24_to_yuyv(unsigned char *d, unsigned char *s, int w, int h) {
  int i;
  for(i=w*h; i>0;i-=2,s+=6,d+=4) {
    unsigned char r,g,b;
#ifdef WORDS_BIGENDIAN
    r=s[0]; g=s[1]; b=s[2];
#else
    b=s[0]; g=s[1]; r=s[2]; 
#endif
    d[0] = Y(r,g,b); d[1] = U(r,g,b);
#ifdef WORDS_BIGENDIAN
    r=s[3]; g=s[4]; b=s[5]; 
#else
    b=s[3]; g=s[4]; r=s[5];
#endif
    d[2] = Y(r,g,b); d[3] = V(r,g,b);
  }
}

/****** YUV to RGB functions *******/
#define sat(x,max) if(x<0) x=0; if(x>max) x=max;
static inline void pix_yuv_to_rgb(unsigned char y, unsigned char u, unsigned char v,
                  unsigned char *r, unsigned char *g, unsigned char *b) {
  int y2,r2,g2,b2;
  y2=76309*y;
  r2=(-14556884+y2+104187*v)>>16; sat(r2,255); *r=r2;
  g2=(8842838+y2-25564*u-53060*v)>>16; sat(g2,255); *g=g2;
  b2=(-18076354+y2+131683*u)>>16; sat(b2,255); *b=b2;
}
#ifdef WORDS_BIGENDIAN
#define RGBDO2 {pix_yuv_to_rgb(*y,*u,*v,&d[1],&d[2],&d[3]);}
#else
#define RGBDO2 {pix_yuv_to_rgb(*y,*u,*v,&d[2],&d[1],&d[0]);}
#endif
static void yuv420_to_rgb32(unsigned char *d, unsigned char *s, int w, int h) {
  unsigned char *y, *u, *v, *u2, *v2;
  int a,b;
  y = s;
  u = y + w * h;
  v = u + w * h / 4;
  for (a = h; a > 0; a -= 2) {
    u2 = u; v2 = v;
    for (b = w; b > 0; b -= 2) {
      RGBDO2; y++; d+=4;
      RGBDO2; y++; u++; v++; d+=4;
    }
    u = u2; v = v2;
    for (b = w; b > 0; b -= 2) {
      RGBDO2; y++; d+=4;
      RGBDO2; y++; u++; v++; d+=4;
    }
  }
}

static void yuyv_to_rgb32(unsigned char *d, unsigned char *s, int width, int height) {
  int i;
  for(i=width*height;i>0;i-=2,s+=4,d+=8) {
#ifdef WORDS_BIGENDIAN
    pix_yuv_to_rgb(s[0],s[1],s[3],&d[1],&d[2],&d[3]);
    pix_yuv_to_rgb(s[2],s[1],s[3],&d[5],&d[6],&d[7]);
#else
    pix_yuv_to_rgb(s[0],s[1],s[3],&d[2],&d[1],&d[0]);
    pix_yuv_to_rgb(s[2],s[1],s[3],&d[6],&d[5],&d[4]);
#endif
  }
}

/** end YUV to RGB functions **/

/******************************************************
 **** The exported functions 
 ********************************************/

int size_img(video_fmt f, int width, int height) {
  /* width should be a multiple of 8 to be sure....
     and height a multiple of 2 */
  switch(f) { 
  case VIDEO_GRAY1:
  case VIDEO_GRAY1X: return ((width+31)/32)*4*height;
  case VIDEO_GRAY4:
  case VIDEO_RGB03:
  case VIDEO_RGB04b:  return width*height;
  case VIDEO_GRAY8:
  case VIDEO_RGB08:
  case VIDEO_RGB08b:
  case VIDEO_HI240:  return width*height;
  case VIDEO_RGB15X:
  case VIDEO_RGB15:
  case VIDEO_RGB16X:
  case VIDEO_RGB16:  return width*height*2;
  case VIDEO_RGB24:
  case VIDEO_RGB24X:
  case VIDEO_RGB24B: return width*height*3;
  case VIDEO_RGB32:
  case VIDEO_RGB32P:
  case VIDEO_RGB32X:
  case VIDEO_RGB32PX:
  case VIDEO_RGB32B: return width*height*4;
  case VIDEO_UYVY:
  case VIDEO_YUYV :  
  case VIDEO_YUV422P: return width*height*2;
  case VIDEO_Y41P:
  case VIDEO_YUV420:
  case VIDEO_YVU420: 
  case VIDEO_YUV411P: 
  case VIDEO_NV12: return width*height*3/2;
  case VIDEO_YUV410:
  case VIDEO_YVU410: return width*height*5/4;
  case MAX_VIDEO_FMT:
  case VIDEO_NOFORMAT: fprintf(stderr,"SHOULD NOT HAPPEN\n"); exit(1);
  }
  return 0;
}


void* convert1(char *src, video_fmt f_src, video_fmt f_dest,
           int width, int height) {
  static void *bufs[MAX_VIDEO_FMT];
  if(debug>=2)
    fprintf(stderr, "convert1 %s -> %s %dx%d\n", 
        int_to_str (f_src,video_fmt_names),
        int_to_str (f_dest,video_fmt_names), width, height);
  if(f_src==f_dest) return src;
  /* during the pipe it is constant in fact... */
  bufs[f_dest]=realloc(bufs[f_dest],size_img(f_dest,width,height));
  convert2(src,f_src,bufs[f_dest],f_dest,width,height);
  return bufs[f_dest];
}

typedef void (*convertf) (unsigned char *d, unsigned char *s, int w, int h);
typedef struct {convertf conv;video_fmt f_src; video_fmt f_dst; int cost;} convertf2;
static convertf2 convs[]= {
  {gray1_to_gray8,  VIDEO_GRAY1,  VIDEO_GRAY8,   20},
  {gray8_to_gray1,  VIDEO_GRAY8,  VIDEO_GRAY1,   40},
  {gray4_to_gray8,  VIDEO_GRAY4,  VIDEO_GRAY8,   20},
  {gray8_to_gray4,  VIDEO_GRAY8,  VIDEO_GRAY4,   40},
  {rgb3_to_rgb32,   VIDEO_RGB03,  VIDEO_RGB32,   20},
  {rgb32_to_rgb3,   VIDEO_RGB32,  VIDEO_RGB03,   40},
  {rgb15_to_rgb32,  VIDEO_RGB15,  VIDEO_RGB32,   10},
  {rgb32_to_rgb15,  VIDEO_RGB32,  VIDEO_RGB15,   15},
  {rgb16_to_rgb32,  VIDEO_RGB16,  VIDEO_RGB32,   10},
  {rgb32_to_rgb16,  VIDEO_RGB32,  VIDEO_RGB16,   15},
  {rgb24_to_rgb32,  VIDEO_RGB24,  VIDEO_RGB32,    5},
  {rgb32_to_rgb24,  VIDEO_RGB32,  VIDEO_RGB24,    5},
  {yuv420_to_gray8, VIDEO_YUV420, VIDEO_GRAY8,  200}, //too much info lost
  {gray8_to_yuv420, VIDEO_GRAY8,  VIDEO_YUV420,   4},
  {hi240_to_rgb32,  VIDEO_HI240,  VIDEO_RGB32,   20},
  {rgb32_to_hi240,  VIDEO_RGB32,  VIDEO_HI240,   40}, //too much info lost
  {rgb8_to_rgb32,   VIDEO_RGB08,  VIDEO_RGB32,   10},
  {rgb32_to_rgb8,   VIDEO_RGB32,  VIDEO_RGB08,   38}, //too much info lost
  {rgb8b_to_rgb32,  VIDEO_RGB08b, VIDEO_RGB32,   10},
  {rgb32_to_rgb8b,  VIDEO_RGB32,  VIDEO_RGB08b,   38},
  {rgb4b_to_rgb32,  VIDEO_RGB04b, VIDEO_RGB32,   20},
  {rgb32_to_rgb4b,  VIDEO_RGB32,  VIDEO_RGB04b,   40},
  {yuyv_to_yuv420,  VIDEO_YUYV,   VIDEO_YUV420,   5},
  {yuv420_to_yuyv,  VIDEO_YUV420, VIDEO_YUYV,     5},
  {rgb32_to_yuv420, VIDEO_RGB32,  VIDEO_YUV420,  32},
  {rgb24_to_yuyv,   VIDEO_RGB24,  VIDEO_YUYV,    30},
  {rgb32_to_yuyv,   VIDEO_RGB32,  VIDEO_YUYV,    31},
  {yuv420_to_rgb32, VIDEO_YUV420, VIDEO_RGB32,   31},
  {yuyv_to_rgb32,   VIDEO_YUYV,   VIDEO_RGB32,   32},
  {yvu420_yuv420,   VIDEO_YVU420, VIDEO_YUV420,   4},
  {yvu420_yuv420,   VIDEO_YUV420, VIDEO_YVU420,   4},
  {rgb32_rgb32b,    VIDEO_RGB32,  VIDEO_RGB32B,   4},
  {rgb32_rgb32b,    VIDEO_RGB32B, VIDEO_RGB32,    4},
  {rgb24_rgb24b,    VIDEO_RGB24,  VIDEO_RGB24B,   4},
  {rgb24_rgb24b,    VIDEO_RGB24B, VIDEO_RGB24,    4},
  {swap16bpp,       VIDEO_YUYV,   VIDEO_UYVY,     6},
  {swap16bpp,       VIDEO_UYVY,   VIDEO_YUYV,     6},
  {swap16bpp,       VIDEO_RGB16,  VIDEO_RGB16X,   6},
  {swap16bpp,       VIDEO_RGB16X, VIDEO_RGB16,    6},
  {swap16bpp,       VIDEO_RGB15,  VIDEO_RGB15X,   6},
  {swap16bpp,       VIDEO_RGB15X, VIDEO_RGB15,    6},
  {swap24bpp,       VIDEO_RGB24,  VIDEO_RGB24X,   6},
  {swap24bpp,       VIDEO_RGB24X, VIDEO_RGB24,    6},
  {swap32bpp,       VIDEO_RGB32,  VIDEO_RGB32X,   6},
  {swap32bpp,       VIDEO_RGB32X, VIDEO_RGB32,    6},
  {swap32bpp,       VIDEO_RGB32P, VIDEO_RGB32PX,  6},
  {swap32bpp,       VIDEO_RGB32PX,VIDEO_RGB32P,   6},
  {rgb24_to_rgb32,  VIDEO_RGB24X, VIDEO_RGB32PX,  5},
  {rgb32_to_rgb24,  VIDEO_RGB32PX,VIDEO_RGB24X,   5},
  {swap1bpp32,      VIDEO_GRAY1,  VIDEO_GRAY1X,   5},
  {swap1bpp32,      VIDEO_GRAY1X, VIDEO_GRAY1,    5},
  {y41p_to_yuyv,    VIDEO_Y41P,   VIDEO_YUYV,    10},
  {yuyv_to_y41p,    VIDEO_YUYV,   VIDEO_Y41P,    10},
  {y410_to_y420,    VIDEO_YUV410, VIDEO_YUV420,  8},
  {y420_to_y410,    VIDEO_YUV420, VIDEO_YUV410,  8},
  {y410_to_y420,    VIDEO_YVU410, VIDEO_YVU420,  8},
  {y420_to_y410,    VIDEO_YVU420, VIDEO_YVU410,  8},
  {yuyv_to_yuv422p, VIDEO_YUYV,   VIDEO_YUV422P, 8},
  {yuv422p_to_yuyv, VIDEO_YUV422P,VIDEO_YUYV,    8},
  {yuv411p_to_yuv422p, VIDEO_YUV411P,   VIDEO_YUV422P, 8},
  {yuv422p_to_yuv411p, VIDEO_YUV422P,VIDEO_YUV411P,    8},
  {nv12_to_yuv420,  VIDEO_NV12,   VIDEO_YUV420,   5},
  {yuv420_to_nv12,  VIDEO_YUV420, VIDEO_NV12,     5},
  {NULL, 0, 0, 100}
};

static convertf2 **firstconv=NULL;
/* compute the best intermediate format by Dijkstra's algorithm */
static void initfirstconv(void) {
  /* direct cannot be put in cost_tab because it could be possible
     that the direct link is not the fastest 
     (probably by a fault in the costs...) */
  int direct[MAX_VIDEO_FMT][MAX_VIDEO_FMT];
  int cost_tab[MAX_VIDEO_FMT][MAX_VIDEO_FMT],i,j,dest;
  convertf2 *c,*c2;
  firstconv=calloc(MAX_VIDEO_FMT*MAX_VIDEO_FMT,sizeof(convertf2*));
  for(i=1;i<MAX_VIDEO_FMT;i++)
    for(j=1;j<MAX_VIDEO_FMT;j++) {
      direct[i][j]=-1;
      if(i==j)
    cost_tab[i][j]=0;
      else
    cost_tab[i][j]=-1;
    }
  c=convs;while(c->conv) {direct[c->f_src][c->f_dst]=c->cost;c++;}
  for(dest=1;dest<MAX_VIDEO_FMT;dest++) {
    int i0,j0;
    do {
      int m=10000000;
      i0=j0=-1;
      for(i=1;i<MAX_VIDEO_FMT;i++)
    if(cost_tab[i][dest]!=-1)
      for(j=1;j<MAX_VIDEO_FMT;j++)
        if(direct[j][i]!=-1 && cost_tab[j][dest]==-1
           && direct[j][i]+cost_tab[i][dest]<m)
          {m=direct[j][i]+cost_tab[i][dest]; i0=i; j0=j;}
      if(i0!=-1) {
    cost_tab[j0][dest]=m;
    c2=convs; while(c2->f_src!=j0 || c2->f_dst!=i0) c2++;
    firstconv[j0+dest*MAX_VIDEO_FMT]=c2;
      }
    } while(i0!=-1);
  }
  if(debug>=2) {
    fprintf(stderr, "conversion costs:\n");
    for(i=1;i<MAX_VIDEO_FMT;i++)
      for(j=1;j<MAX_VIDEO_FMT;j++)
    fprintf(stderr, "%s -> %s: %d (by %s)\n", int_to_str(i, video_fmt_names),
        int_to_str(j, video_fmt_names), cost_tab[i][j],
        firstconv[i+j*MAX_VIDEO_FMT]!=NULL ?
        int_to_str(firstconv[i+j*MAX_VIDEO_FMT]->f_dst, video_fmt_names):"-");
  }
}

static int convert_cost(video_fmt f_src, video_fmt f_dest) {
  convertf2 *c;
  if(f_src==f_dest) return 0;
  if(firstconv==NULL) initfirstconv();
  c=firstconv[f_src+MAX_VIDEO_FMT*f_dest];
  if(c==NULL) return 1000000;
  return c->cost+convert_cost(c->f_dst,f_dest);
}


void convert2(char *src, video_fmt f_src, char *dest, video_fmt f_dest,
          int width, int height) {
  int size;
  convertf2 *c;
  if(debug>=2) {
    fprintf(stderr, "convert2 %s -> %s %dx%d\n", 
        int_to_str (f_src,video_fmt_names),
        int_to_str (f_dest,video_fmt_names), width, height);
  }
  size=size_img(f_src,width,height);
  if(f_src==f_dest) {
    fast_memcpy(dest,src,size);
    return;
  }
  if(firstconv==NULL) initfirstconv();
  c=firstconv[f_src+MAX_VIDEO_FMT*f_dest];
  if(c==NULL) {
    fprintf(stderr, "convert2 %s -> %s not implemented\n", 
        int_to_str (f_src,video_fmt_names),
        int_to_str (f_dest,video_fmt_names));
    //exit (1);
    return;
  }
  if(c->f_dst==f_dest)
    c->conv((unsigned char*)dest, (unsigned char*)src, width, height);
  else {
    void *mem=convert1(src, f_src, c->f_dst, width, height);
    convert2(mem, c->f_dst, dest, f_dest, width, height);
  }
  return;
}

/* takes an array of video_fmt */
int setpreferred_list(video_fmt formats[], video_fmt prefered[]) {
  int available[MAX_VIDEO_FMT], i;
  for(i=0;i<MAX_VIDEO_FMT;i++) available[i]=0;
  for(i=0;formats[i]!=0;i++) available[formats[i]]=1;
  return setpreferred(available,prefered);
}

/* takes an array of booleans */
int setpreferred(int available[], video_fmt prefered[]) {
  int i;
  video_fmt def=0;
  if(debug) fprintf(stderr, "*** asked for prefered conversions ***\n");
  for(i=1;i<MAX_VIDEO_FMT;i++)
    if(available[i]) {def=i; break;}
  if(def==0) return 0;
  for(i=1;i<MAX_VIDEO_FMT;i++) {
    int cost=100000,j;
    prefered[i]=def;  // unneeded if there are all the conversions
    for(j=1;j<MAX_VIDEO_FMT;j++)
      if(available[j] && convert_cost(j,i)<cost) {
    cost=convert_cost(j,i);
    prefered[i]=j;
      }
    if(debug)
      fprintf(stderr,"%s --> %s\n", int_to_str(i, video_fmt_names),
          int_to_str(prefered[i], video_fmt_names));
  }
  if(debug) fprintf(stderr, "*** end prefered conversions ***\n");
  return 1;
}
```


<hr />
版权信息
---
title: 判断字符串编码方式
permalink: 
categories: 实用技巧
tags: encoding
description: 
image: 
copyright: true     //增加底部的版权信息（需要配置）
date: 2024-02-20 18:16:10
---

判断字符串编码为UTF-8还是GBK


<!--more-->

## UTF8
```
bool is_str_utf8(const char* str)
{
  unsigned int nBytes = 0;//UFT8可用1-6个字节编码,ASCII用一个字节
  unsigned char chr = *str;
  bool bAllAscii = true;
  for (unsigned int i = 0; str[i] != '\0'; ++i){
    chr = *(str + i);
    //判断是否ASCII编码,如果不是,说明有可能是UTF8,ASCII用7位编码,最高位标记为0,0xxxxxxx
    if (nBytes == 0 && (chr & 0x80) != 0){

      bAllAscii = false;
    }
    if (nBytes == 0) {
      //如果不是ASCII码,应该是多字节符,计算字节数
      if (chr >= 0x80) {
        if (chr >= 0xFC && chr <= 0xFD){
          nBytes = 6;
        }
        else if (chr >= 0xF8){
          nBytes = 5;
        }
        else if (chr >= 0xF0){
          nBytes = 4;
        }
        else if (chr >= 0xE0){
          nBytes = 3;
        }
        else if (chr >= 0xC0){
          nBytes = 2;
        }
        else{
          return false;
        }
        nBytes--;
      }
    }
    else{
      //多字节符的非首字节,应为 10xxxxxx
      if ((chr & 0xC0) != 0x80){
        return false;
      }
      //减到为零为止
      nBytes--;
    }
  }
  //违返UTF8编码规则
  if (nBytes != 0) {
    return false;
  }
  if (bAllAscii){ //如果全部都是ASCII, 也是UTF8
    return true;
  }
  return true;
}
```
## GBK
```
bool is_str_gbk(const char* str)
{
  unsigned int nBytes = 0;//GBK可用1-2个字节编码,中文两个 ,英文一个
  unsigned char chr = *str;
  bool bAllAscii = true; //如果全部都是ASCII,
  for (unsigned int i = 0; str[i] != '\0'; ++i){
    chr = *(str + i);
    if ((chr & 0x80) != 0 && nBytes == 0){// 判断是否ASCII编码,如果不是,说明有可能是GBK
      bAllAscii = false;
    }
    if (nBytes == 0) {
      if (chr >= 0x80) {
        if (chr >= 0x81 && chr <= 0xFE){
          nBytes = +2;
        }
        else{
          return false;
        }
        nBytes--;
      }
    }
    else{
      if (chr < 0x40 || chr>0xFE){
        return false;
      }
      nBytes--;
    }//else end
  }
  if (nBytes != 0) {   //违返规则
    return false;
  }
  if (bAllAscii){ //如果全部都是ASCII, 也是GBK
    return true;
  }
  return true;
}
```

<hr />
版权信息
import BlockHeader from '@/components/block-header';
import Image from 'next/image';
import fs from "fs";
import path from "path";
import React from 'react';

const photDir = "/img/goosies/2024photos/"
const dir = path.join(process.cwd(), "public" + photDir);
const images = fs.readdirSync(dir);

export default async function Events() {

    return (
        <main className="flex flex-col">
            <div className="flex flex-col container py-12 gap-12">
              <BlockHeader title="Goosies 2024" />

              {images.map((img) => (
                  <Image
                  key={img}
                  src={`${photDir}${img}`}
                  alt=""
                  width={1000}
                  height={1000}
                  sizes="(max-width: 1000px) 100vw, 1000px"
                  className="mx-auto w-full h-auto max-w-[1000px] object-contain"
                  />
              ))}
              
            </div>
        </main>
    );
}

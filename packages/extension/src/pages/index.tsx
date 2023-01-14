import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
import { useViewportSize } from '@mantine/hooks';
import Wallpaper from '@/components/Wallpaper';

const LogoAnimation = dynamic(() => import('@/components/Animation'), {
  ssr: false,
});

const Index = () => {
  const navbarRef = useRef<HTMLDivElement>(null);
  const viewportSize = useViewportSize();
  const contentWidth = viewportSize.width;
  const contentHeight =
    viewportSize.height - (navbarRef.current?.clientHeight ?? 0);

  return (
    <div className='w-screen h-screen flex flex-col select-none'>
      <div className='navbar gap-4 p-4' ref={navbarRef}>
        <img src='/images/rhodes_island.png' alt='' width={40} height={40} />
        <h1 className='text-lg'>Rhodes Console</h1>
      </div>
      <div className='flex-1 overflow-auto relative'>
        <Wallpaper className='sticky w-full h-full top-0 left-0 object-cover blur-3xl brightness-50 saturate-200' />
        <LogoAnimation
          className='absolute top-0 left-0 w-full h-full'
          width={contentWidth}
          height={contentHeight}
        />
      </div>
    </div>
  );
};

export default Index;

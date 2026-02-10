import { type NextRequest, NextResponse } from 'next/server';
import { getSlideDataByDayServer } from '@/lib/slide-data-server';

export async function GET(request: NextRequest, { params }: { params: { day: string } }) {
  try {
    const day = Number.parseInt(params.day, 10);

    if (isNaN(day)) {
      return NextResponse.json({ error: 'Invalid day parameter' }, { status: 400 });
    }

    const slideData = await getSlideDataByDayServer(day);

    if (!slideData) {
      console.error(`Slide data not found for day ${day}`);
      return NextResponse.json({ error: 'Slide data not found' }, { status: 404 });
    }

    // Return the slide data with proper caching headers
    return NextResponse.json(slideData, {
      headers: {
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200',
      },
    });
  } catch (error) {
    console.error('Error fetching slide data:', error);
    return NextResponse.json({ error: 'Failed to fetch slide data' }, { status: 500 });
  }
}

export const HOW_TO: Record<
  string,
  {
    title: string
    description: string
    image: any
    width?: number
    height?: number
  }[]
> = {
  th: [
    {
      title: 'ยินดีต้อนรับสู่ วีลโก 👋',
      description: 'มาเรียนรู้กันดีกว่าว่าวีลโกทำอะไรได้บ้าง',
      image: require('~/assets/howto/wheelgo-logo-with-shadow.png'),
      width: 284,
      height: 284,
    },
    {
      title: 'ดูสถานที่ใกล้เคียงและสิ่งแวดล้อม',
      description:
        'ดูสถานที่ที่อยู่ใกล้คุณที่สุด สิ่งแวดล้อมสำหรับผู้ใช้วีลแชร์และเส้นทางที่เข้าถึงได้',
      image: require('~/assets/howto/nearby-places-th.png'),
      width: 300,
      height: 364,
    },
    {
      title: 'แสดงข้อมูลเกี่ยวกับการเข้าถึง',
      description:
        'กดเพื่อดูข้อมูลของสถานที่ ตรวจสอบสิ่งอำนวยความสะดวกสำหรับผู้ใช้วีลแชร์และดูสถานที่ใกล้เคียงอื่นๆ',
      image: require('~/assets/howto/places-accessibility-th.png'),
      width: 300,
      height: 364,
    },
    {
      title: 'ค้นหาสถานที่และเส้นทางแนะนำ',
      description:
        'กดแว่นขยายเพื่อค้นหาสถานที่ หรือค้นหาเส้นทางที่แนะนำโดยผู้ใช้อื่น',
      image: require('~/assets/howto/find-places-th.png'),
      width: 349,
      height: 364,
    },
    {
      title: 'ให้คะแนนและรีวิว',
      description:
        'ให้คะแนนภาพรวมระดับความเข้าถึง สิ่งอำนวยความสะดวกสำหรับผู้ใช้วีลแชร์และเขียนรีวิวให้กับสถานที่ที่คุณเคยไป',
      image: require('~/assets/howto/rate-reviews-th.png'),
      width: 345,
      height: 364,
    },
    {
      title: 'บันทึกการเดินทางของคุณ',
      description:
        'มีส่วนร่วมในการมอบสิ่งดีๆกลับสู่สังคมผ่านการบันทึกเส้นทางการเดินทางของคุณ',
      image: require('~/assets/howto/trace-th.png'),
      width: 300,
      height: 364,
    },
    {
      title: 'บันทึกการมีส่วนร่วมของคุณ',
      description:
        'กด “บันทึกของฉัน” เพื่อดูบันทึกของ สถานที่ที่คุณชอบ รีวิวของคุณ และเส้นทางของคุณ',
      image: require('~/assets/howto/records-th.png'),
      width: 333.25,
      height: 364,
    },
    {
      title: 'สะสมความสำเร็จ !',
      description:
        'ดูความสำเร็จและภาพรวมบนหน้าโปรไฟล์และได้รับการคำขอบคุณจากการมีส่วนร่วมของคุณผ่านระบบการสะสมเหรียญตรา',
      image: require('~/assets/howto/badge-th.png'),
      width: 300,
      height: 364,
    },
  ],
  en: [
    {
      title: 'Welcome to Wheel Go 👋',
      description: "Let's find out what you can do with Wheel Go",
      image: require('~/assets/howto/wheelgo-logo-with-shadow.png'),
      width: 284,
      height: 284,
    },
    {
      title: 'Nearby Places & Conditions',
      description:
        'Explore places nearby, and see wheelchair-friendly surrounding conditions and routes',
      image: require('~/assets/howto/nearby-places.png'),
      width: 300,
      height: 364,
    },
    {
      title: "Check Place's Accessibility",
      description:
        'Tap to see place info, check the wheelchair-accessible facilities, and seethe nearby places',
      image: require('~/assets/howto/places-accessibility.png'),
      width: 300,
      height: 364,
    },
    {
      title: 'Find Places, Get Guidelines',
      description:
        'Tap on the search icon to search places, or get accessible route guidelines',
      image: require('~/assets/howto/find-places.png'),
      width: 349,
      height: 364,
    },
    {
      title: 'Rate & Leave a Review',
      description:
        'Rate the accessibility and wheelchair-friendly facilities, and review the visited places',
      image: require('~/assets/howto/rate-reviews.png'),
      width: 345,
      height: 364,
    },
    {
      title: 'Trace your journey',
      description:
        'Contribute back to society through the route tracing of your journey',
      image: require('~/assets/howto/trace.png'),
      width: 300,
      height: 364,
    },
    {
      title: 'Records of Contribution',
      description:
        'Tap record to view your record of favorite places, reviews, and contributed routes',
      image: require('~/assets/howto/records.png'),
      width: 333.25,
      height: 364,
    },
    {
      title: 'Get Recognized !',
      description:
        'View your achievement and activity summary on the profile page, and get recognized through badge collection',
      image: require('~/assets/howto/badge.png'),
      width: 300,
      height: 364,
    },
  ],
}

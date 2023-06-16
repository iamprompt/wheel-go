interface FAQItem {
  question: string
  answer: string
}

export const FAQItems: Record<string, Array<FAQItem>> = {
  th: [
    {
      question: 'Wheel Go คืออะไร?',
      answer:
        'แอปพลิเคชันอำนวยความสะดวกสำหรับผู้บกพร่องทางการเคลื่อนไหวที่ใช้วีลแชร์ในการเดินทาง การวางแผนกิจกรรม และกระบวนการตัดสินใจ โดยเริ่มต้นโครงการภายในพื้นที่ มหาวิทยาลัยมหิดล (วิทยาเขตศาลายา) และมีการตั้งเป้าหมายที่จะขยายพื้นที่การให้บริการในอนาคต ตลอดจนสร้างช่องทางให้หน่วยงาน บุคลากร และนักศึกษา มหาวิทยาลัยมหิดล ร่วมมือกันปรับปรุงสภาพความเป็นอยู่ของผู้ที่มีข้อจำกัดทางกายภาพอื่น ๆ',
    },
    {
      question: 'แผนที่',
      answer:
        'องค์ประกอบของแผนที่ประกอบด้วย\n1. แผนที่จะแสดงอยู่บนหน้าสำรวจ\n2. ในแผนที่จะมีองค์ประกอบประกอบด้วยหมุดของสถานที่ หมุดของวัตถุแวดล้อม และเส้นทางที่เข้าถึงได้\n3. โดยพื้นฐานข้อมูลการเข้าถึงอย่างย่อจะแสดงตามสถานที่ใกล้ตำแหน่งปัจจุบันของคุณที่สุด\n4. หมุดของสถานที่สามารถจำแนกได้ 9 ประเภท ประกอบไปด้วย อาคาร การขนส่ง คาเฟ่ อาหาร ที่จอดรถ ห้องน้ำ สวนสาธารณะ ที่พักอาศัย และ กีฬา\n5. หมุดของวัตถุแวดล้อมจะประกอบไปด้วย ทางลาดขนาดย่อม และเหตุฉุกเฉิน\n6. สำหรับตำแหน่งทางลาดเข้าอาคารนั้นจะแสดงเป็นสัญลักษณ์ “ทางลาด” ที่ใช้สำหรับสิ่งอำนวยความสะดวกสำหรับผู้ใช้รถเข็นในแอปพลิเคชันนี้',
    },
    {
      question: 'การค้นหาสถานที่',
      answer:
        'คุณสามารถค้นหาสถานที่ได้โดย\n1. จากหน้าสำรวจ กดที่สัญลักษณ์ “แว่นขยาย”\n2. ระบุชื่อสถานที่ที่คุณจะไป หรือ เลือกประเภทสถานที่ของสถานที่ที่คุณจะไป\n3. คุณสามารถใช้ตัวกรองเพื่อการค้นหาที่ละเอียดขึ้นได้\n4. กดที่ผลลัพธ์เพื่อดูข้อมูลของสถานที่',
    },
    {
      question: 'การค้นหาเส้นทางแนะนำ',
      answer:
        'คุณสามารถค้นหาเส้นทางแนะนำได้โดย\n1. จากหน้าสำรวจ กดที่กล่อง “ค้นหาเส้นทางแนะนำ?”\n2. ระบุสถานที่ ต้นทางและปลายทาง ที่คุณจะไป\n3. กดที่ผลลัพธ์เพื่อดูเส้นทางแนะนำที่เหมากับการเดินทางของคุณ',
    },
    {
      question: 'การให้คะแนนและรีวิวสถานที่',
      answer:
        'คุณสามารถให้คะแนนและรีวิวสถานที่ได้โดย\n1. จากหน้าข้อมูลของสถานที่ที่คุณเลือก กดที่ปุ่ม “รีวิวที่นี่” บริเวณด้านล่างของหน้า หรือ กล่อง “รีวิวที่นี่”\n2. ให้คะแนนระดับความเข้าถึงของสถานที่ โดยสามารถอ้างอิงจากเกณฑ์ที่ระบบได้แสดงไว้\n3. ให้คะแนนสิ่งอำนวยความสะดวก\n  • สำหรับสถานที่ประเภท “อาคาร” คุณสามารถให้คะแนนสิ่งอำนวยความสะดวกสำหรับผู้ใช้เก้าอี้รถเข็นที่ประกอบไปด้วย ทางลาด ผู้ช่วย ลิฟต์โดยสาร ที่จอดรถ และพื้นผิว\n  • สำหรับสถานที่ประเภทอื่น คุณสามารถเลือกให้คำชม ตามตัวเลือกที่ประกอบด้วย ถูกสุขลักษณะ การบริการดี มีสิ่งอำนวยความสะดวก และมีความปลอดภัย\n4. เขียนรีววิวสถานที่ตามประสบการณ์ที่คุณได้รับ\n5. เพิ่มรูปประกอบการรีวิวตามที่คุณต้องการ (มากที่สุด 3 รูป)\n6. เลื่อนเพื่อ ซ่อน หรือ แสดง ชื่อผู้ใช้ของคุณในฐานะผู้รีวิว\n7. กดปุ่ม “ยืนยัน” เพื่อรีวิวสถานที่ที่คุณเลือก',
    },
    {
      question: 'การบันทึกการเดินทาง',
      answer:
        'คุณสามารถบันทึกการเดินทางของคุณได้โดย\n1. จากหน้าสำรวจ กดที่ปุ่ม “บันทึกการเดินทาง” แล้วระบบจะเตรียมการบันทึก\n2. คุณสามารถเริ่มการบันทึกโดยกดที่ปุ่ม “เริ่มการบันทึก” จากนั้นระบบจะเริ่มบันทึกการเดินทางของคุณ\n3. ระหว่างการบันทึกการเดินทาง คุณสามารถหยุดพักโดยกดปุ่ม “พัก” และหยุดบันทึกโดยกดปุ่ม “หยุด”\n4. ถ้าคุณหยุดพัก ระบบจะหยุดการบันทึกชั่วคราว และคุณสามารถบันทึกการเดินทางของคุณต่อได้โดยกดปุ่ม “บันทึกต่อ”\n5. ถ้าคุณหยุดการบันทึก ระบบจะทำการบันทึกการเดินทางของคุณเข้าสู่ฐานข้อมูลโดยอัตโนมัติ',
    },
    {
      question: 'การดูบันทึกการมีส่วนร่วมของคุณ',
      answer:
        'คุณสามารถดูบันทึกการมีส่วนร่วมของคุณได้โดย\n1. ในหน้าบันทึกของฉัน ระบบจะแสดงลิสต์รายการบันทึกการมีส่วนร่วมของคุณ 3 ประเภทประกอบไปด้วย สถานที่ของฉัน รีวิวของฉัน และเส้นทางของฉัน\n2. คุณสามารถกดเลือกประเภทของบันทึกเพื่อดูข้อมูลบันทึกในประเภทนั้น ๆ',
    },
    {
      question: 'การสะสมเหรียญตรา',
      answer:
        'คุณสามารถสะสมเหรียญตราได้โดย\n1. มีส่วนร่วมในการทำกิจกรรมบนแอปพลิเคชัน เช่น บันทึกเส้นทาง, การรีวิว, และอื่นๆ\n2. เหรียญตราจะเพิ่มขึ้นตามกิจกรรมที่คุณมีส่วนร่วมในเกณฑ์ที่ระบบกำหนดไว้\n3. จากหน้าโปรไฟล์เหรียญตราจะแสดงอยู่ใต้รูปโปรไฟล์ของคุณ\n4. คุณสามารถกดที่เหรียญตราเพื่อดูรายละเอียดของเหรียญตราได้',
    },
    {
      question: 'การแก้ไขโปรไฟล์',
      answer:
        'คุณสามารถตั้งค่าโปรไฟล์ได้โดย\n1. จากหน้าโปรไฟล์ กดที่คำว่า “แก้ไขโปรไฟล์”\n2. ข้อมูลส่วนตัวที่สามารถแก้ไขได้ประกอบด้วย 3 ส่วน ได้แก่ ชื่อที่แสดง ข้อมูลพื้นฐาน และบัญชี\n3. เมื่อแก้ไขข้อมูลตามที่คุณต้องการแล้ว กดที่คำว่า “บันทึก” จากนั้นระบบจะทำการอัพเดตโปรไฟล์ของคุณ',
    },
    {
      question: 'การเปลี่ยนภาษาแอปพลิเคชัน',
      answer:
        'คุณสามารถเปลี่ยนภาษาของแอปพลิเคชันได้โดย\n1. จากหน้าการตั้งค่า ในส่วนทั่วไป กดที่คำว่า “Language/ภาษา”\n2. เลือกภาษาของแอปพลิเคชันที่คุณต้องการ\n3. กดที่คำว่า “เรียบร้อย” เพื่อกลับไปที่หน้าตั้งค่า\n4. กดที่คำว่า “บันทึก” จากนั้นระบบจะทำการเปลี่ยนภาษาของแอปพลิเคชันตามที่คุณเลือกไว้',
    },
    {
      question: 'การตั้งค่าการอนุญาตการให้ข้อมูล',
      answer:
        'คุณสามารถตั้งค่าการอนุญาตการให้ข้อมูลได้โดย\n1. จากหน้าการตั้งค่า ในส่วนความเป็นส่วนตัว กดที่คำว่า “การอนุญาตการให้ข้อมูล”\n2. ระบบจะนำคุณไปสู่การตั้งค่าการอนุญาตการให้ข้อมูลกับแอปพลิเคชันนี้ในโทรศัพท์มือถือของคุณ\n3. เลือกเปิด/ปิด การอนุญาตการให้ข้อมูลจากโทรศัพท์มือถือของคุณ ต่อแอปพลิเคชันนี้',
    },
    {
      question: 'การลบบัญชี',
      answer:
        'คุณสามารถลบบัญชีได้โดย\n1. จากหน้าการตั้งค่า กดทื่ปุ่ม "ลบบัญชี"\n2. อ่านคำชี้แจ้งเกี่ยวกับการลบบัญชีของคุณ\n3. กดที่ปุ่ม “ยืนยันการลบ” จากนั้นระบบจะลบข้อมูลทั้งหมดของคุณออกจากระบบ',
    },
    {
      question: 'การแจ้งปัญหาการใช้งาน',
      answer:
        'คุณสามารถแจ้งปัญหาการใช้งานได้โดย\nติดต่อคณะผู้พัฒนาผ่านทางอีเมล wheelgo.ict.mahidol@gmail.com เพื่อแจ้งปัญหาการใช้งาน',
    },
  ],
  en: [
    {
      question: 'What is Wheel Go?',
      answer:
        'An assistive application for mobility impaired people who use wheelchairs to travel, plan activities. and decision-making process by starting the project within the area of Mahidol University (Salaya Campus) and aims to expand service areas in the future as well as creating a channel for departments, personnel and students of Mahidol University to work together to improve the living conditions of people with other physical limitations.',
    },
    {
      question: 'Map',
      answer:
        'The elements of the map include:\n1. The map displays on the explore page.\n2. On the map there will be an element consisting of place pins. surrounding condition pins and accessible routes.\n3. The mini place details is basically displayed by location closest to your current location.\n4. Location pins consists of 9 categories, including building, transportation, cafe, food, parking, toilet, park, residence, and sports.\n5. Surrounding condition pins consist of curb cut and incedent.\n6. The location of the ramp to enter the building is indicated by the “Ramp” icon used for wheelchair accessible facilities in this application.',
    },
    {
      question: 'Search for a place',
      answer:
        'You can search the place to visit by:\n1. On the explore page, tap on the “Magnify” icon.\n2. Type in the place name in the search box or choose the category of the place that you want to visit.\n3. You can use the filter for the advanced place search.\n4. Choose the place you prefer and see the place details.',
    },
    {
      question: 'Find the guideline path',
      answer:
        'You can get path guidelines on how to travel as follows:\n1. On the explore page, tap on the “Find accessible route?” box.\n2. Type in the place name that you’re traveling from and the place you would like to visit.\n3. Choose the suggested guideline path that matches your journey plan.',
    },
    {
      question: 'Rate and review the place',
      answer:
        'You can give rating and write a review for the place you have visited by:\n1. On the place details page, tap on “Review this place” at the bottom of the page, or “Review this place” box.\n2. Rate the overall accessible level of the place based on the given criteria.\n3. Rate the accessible level of facilities at the place\n  - For the place in “Building” category, you can rate the wheelchair-friendly facilities includes: ramp, assistance, elevator, parking, and surface.\n  - For the other categories, you can give the compliment following these choices: Cleanliness, Great service mind, Nice facilities, and Safety.\n4. Write a review of the place based on your experience.\n5. Upload images to the review (up to 3 images)\n6. Slide the toggle to hide or show your username as a reviewer.\n7. Tap on the "Confirm" button to review the place you visited.',
    },
    {
      question: 'Record the journey',
      answer:
        'You can record your journey by:\n1. On the explore page, tap on “Trace your journey” button, and then system will prepare for recording.\n2. You can start recording by tap on “Start Tracing” button, and then system will record your journey.\n3. During your journey, you can take a break and pause the record by tap on “Pause” button, and stop the record by tap on “Stop” button.\n4. If you pause the record, the system will pause the recording progress, and you can continue record your journey by tap on “Continue” button.\n5. If you stop the record, your journey will be saved in the system automatically.',
    },
    {
      question: 'View your contribution record',
      answer:
        'You can view the record of contribution by:\n1. On the record page, there are 3 types of the record list is shown, include Favorites Places, Place Review, and Contributed Routes.\n2. Choose the record you prefer and see the record details.',
    },
    {
      question: 'Badges collection',
      answer:
        'You can collect badges by:\n1. Contribute to the system such as journey recording, review, etc.\n2. Badges will be given to you as you contribution accroding to the criteria.\n3. Badges that you have will be shown on the profile page.\n4. You can tap on each badge, to see details of the badge.',
    },
    {
      question: 'Edit the profile',
      answer:
        'You can edit your profile by:\n1. On the profile page, tap on “Edit Profile”.\n2. The information that can be edited consists of 3 sections include: Display Name, Basic Information, and Account.\n3. When completed the profile edit, tap on “Save”, and then system will update your profile.',
    },
    {
      question: 'Change the application language',
      answer:
        'You can change the application language by:\n1. On the setting page in the general section, tap on “Language/ภาษา”.\n2. Select your preferred language.\n3. Tap on “Done” to return to the setting page.\n4. Tap on “Save”, and then the system will change the application language following your selection.',
    },
    {
      question: 'Change the personal data allowance setting',
      answer:
        'You can change the personal data allowance by:\n1. On the setting page in the privacy section, tap on “Your Personal Data Allowance”.\n2. System will bring you to the personal data allowance setting in your mobile phone.\n3. Set the setting of your personal data allowance setting.',
    },
    {
      question: 'Delete the account',
      answer:
        'You can delete your account by:\n1. On the setting page, tap on the “Delete your account” button.\n2. Read the description of account deleting.\n3. Tap on “Confirm to delete”, and then system will delete all your data from the system.',
    },
    {
      question: 'Report the issue',
      answer:
        'You can report the issue by:\nContact the development team via email: wheelgo.ict.mahidol@gmail.com to report about the issue.',
    },
  ],
}

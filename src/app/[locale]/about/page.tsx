import { useTranslations } from 'next-intl'

export default function About() {
  const t = useTranslations('')
  return (
    <div className='px-32 py-24 text-center text-2xl'>
      {t(
        'The Programming Community at the Oriental Institute of Science and Technology (OIST) envisions itself as a beacon of innovation and collaboration, uniting students, faculty, and professionals passionate about coding and technology. With a mission to cultivate technical expertise and a creative mindset, the community fosters a vibrant ecosystem of learning through hackathons, workshops, coding challenges, and collaborative projects. Its vision is to empower individuals to become problem-solvers and innovators, contributing meaningfully to real-world technological advancements while creating a culture of inclusivity, excellence, and lifelong learning.'
      )}
    </div>
  )
}

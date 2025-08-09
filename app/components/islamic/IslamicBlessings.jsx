// app/components/islamic/IslamicBlessings.jsx - Islamic Blessings Component
'use client'

const IslamicBlessings = () => {
    return (
        <>
            {/* Hidden Islamic blessings for spiritual purpose */}
            <div className="sr-only" aria-hidden="true">
                {/* Opening blessing */}
                <div className="font-arabic">
                    بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
                </div>
                <div>
                    In the name of Allah, the Most Gracious, the Most Merciful
                </div>

                {/* Protective verses */}
                <div className="font-arabic">
                    اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ
                </div>
                <div>
                    O Allah, send prayers and peace upon our Prophet Muhammad
                </div>

                <div className="font-arabic">
                    رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ
                </div>
                <div>
                    Our Lord, give us good in this world and good in the hereafter, and save us from the punishment of the Fire. (QS. Al-Baqarah: 201)
                </div>

                {/* Business blessing */}
                <div className="font-arabic">
                    اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا
                </div>
                <div>
                    O Allah, bless us in what You have provided for us
                </div>

                {/* Protection for website */}
                <div className="font-arabic">
                    أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ
                </div>
                <div>
                    I seek refuge in Allah from Satan the accursed
                </div>

                {/* Closing blessing */}
                <div className="font-arabic">
                    رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي
                </div>
                <div>
                    My Lord, expand for me my breast and ease for me my task
                </div>
            </div>

            {/* Meta tags for Islamic blessing */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'Organization',
                        name: 'Nayea.id',
                        description: 'Islamic Fashion & Accessories with Islamic Values',
                        blessing: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم',
                        values: ['Halal', 'Islamic', 'Modest Fashion', 'Quality'],
                        url: 'https://nayea.id'
                    })
                }}
            />
        </>
    )
}

export default IslamicBlessings
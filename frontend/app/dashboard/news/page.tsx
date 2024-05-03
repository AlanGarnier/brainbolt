import { DashboardTitle,DashboardSubtitle,DashboardText } from '@/components/CustomTexts'
import React from 'react'

const NewsPage = () => {

    const items = ['Lancement de Space Invaders ! 👾', 'Lancement de Quiz Master ! 🧠', 'Lancement de notre Chat - Version Beta  💬', 'Informations sur notre communauté 👥'];
  
  return (
    <>
      <div className="w-11/12 mx-auto">
        <DashboardTitle>Nouveautés ✨</DashboardTitle>
      </div>
      <div className="w-11/12  mx-auto">
        <ul className='list-disc'>
            {items.map((item, index) => (
              <DashboardSubtitle key={index}>
                {item}
                {index === 0 && (
                  <DashboardText>Affrontez des hordes d	&apos;envahisseurs extraterrestres déterminés à conquérir notre planète. Utilisez vos compétences et vos tactiques pour repousser l&apos;ennemi et sauver l&apos;humanité.</DashboardText>
                )}
                {index === 1 && (
                  <DashboardText>Défiez votre esprit avec une série de questions passionnantes. Testez vos connaissances et votre réflexion pour atteindre la victoire. Affrontez des énigmes complexes et prouvez que vous êtes le maître du quiz. Êtes-vous prêt à relever le défi ?</DashboardText>
                )}
                {index === 2 && (
                  <DashboardText>Plongez dans une nouvelle expérience de communication en temps réel avec vos amis. Connectez-vous instantanément et échangez des messages avec ceux qui vous sont chers. Partagez des moments, des idées et des rires dans un environnement convivial et sécurisé. Rejoignez la beta et découvrez le futur des conversations en ligne!</DashboardText>
                )}
                {index === 3 && (
                  <DashboardText>Respectez les règles de notre communauté pour maintenir un environnement accueillant et positif. Ensemble, créons un espace où chacun se sent chez lui.</DashboardText>
                )}
              </DashboardSubtitle>
            ))}
        </ul>
      </div>
    </>
  )
}

export default NewsPage
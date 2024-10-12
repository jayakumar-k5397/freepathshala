import React from 'react'

export default function ThankyouPage() {
  return (
    <div
    style={{
      backgroundImage: 'url(https://www.educationonwheels.org/image-basket/poor-kids-visit-to-espalier-school-1487851389.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      width: "100vw",
      height: "100vh"}}
    >
      <div className="login-form p-3" style={{backgroundColor: "white", opacity:"85%"}}>
        <h1 className='m-2'>Thank you for the contribution</h1>
        <p className='m-3'>On behalf of everyone at Freepathshala, we want to extend our heartfelt thanks for your generous donation of waste items to support the education of underprivileged children.</p>

        <p className='m-3'>Your contributions play a vital role in providing essential resources and opportunities for these kids. With your help, we are one step closer to making quality education accessible for all.</p>

        <p className='m-3'>Thank you for being a part of our mission. Together, we can create lasting change!</p>

        <a className='m-3' style={{textDecoration:"none"}} href="https://freepathshala.org/">freepathshala</a>
      </div>

    </div>
  )
}

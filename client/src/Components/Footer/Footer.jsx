
import { FooterIcon ,Footer, FooterTitle, FooterLinkGroup, FooterLink, FooterDivider, FooterCopyright } from 'flowbite-react'
import React from 'react'
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble } from 'react-icons/bs';
import { Link } from 'react-router-dom'

const FooterCom = () => {
  return (
    <Footer container className='border border-t-8 border-red-400'>
      <div className='w-full max-w-7xl mx-auto'>
        <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
          <div className='mt-5'>
            <Link
              to='/'
              className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'
            >
              <span className='px-2 py-1 bg-gradient-to-r from-red-200 via-red-400 to-yellow-200 rounded-lg text-black'>
                Moory
              </span>
              Blog
            </Link>
          </div>
          <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>
            <div>
              <FooterTitle title='About' />
              <FooterLinkGroup col>
                <FooterLink
                  href='https://github.com/Murtadha9'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Mr.Moory's GitHub
                </FooterLink>
                <FooterLink
                  href='/about'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                 Mooory Blog
                </FooterLink>
              </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle title='Follow us' />
              <FooterLinkGroup col>
                <FooterLink
                  href='https://www.github.com/sahandghavidel'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Github
                </FooterLink>
                <FooterLink href='#'>Discord</FooterLink>
              </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle title='Legal' />
              <FooterLinkGroup col>
                <FooterLink href='#'>Privacy Policy</FooterLink>
                <FooterLink href='#'>Terms &amp; Conditions</FooterLink>
              </FooterLinkGroup>
            </div>
          </div>
        </div>
        <FooterDivider />
        <div className='w-full sm:flex sm:items-center sm:justify-between'>
          <FooterCopyright
            href='#'
            by="Moory Blog"
            year={2024}
          />
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <FooterIcon href='#' icon={BsFacebook}/>
            <FooterIcon href='#' icon={BsInstagram}/>
            <FooterIcon href='#' icon={BsTwitter}/>
            <FooterIcon href='https://github.com/Murtadha9' target='_blank' icon={BsGithub}/>
            <FooterIcon href='#' icon={BsDribbble}/>

          </div>
        </div>
      </div>
    </Footer>
  )
}

export default FooterCom

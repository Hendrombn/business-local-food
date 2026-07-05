import Link from 'next/link';

import styles from './Footer.module.css';
import type { FooterProps, FooterLink } from './Footer.types';

export default function Footer({
  links,
  copyright,
  className,
  socialLinks,
}: FooterProps) {
  const footerClasses = [styles.footer, className ?? '']
    .filter(Boolean)
    .join(' ');

  const currentYear = new Date().getFullYear();

  return (
    <footer className={footerClasses}>
      <div className={styles.container}>
        <div className={styles.content}>
          {links && links.length > 0 && (
            <nav className={styles.links}>
              {links.map((link, index) => (
                <Link
                  key={link.id || index}
                  href={link.href}
                  className={styles.link}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          )}

          {socialLinks && socialLinks.length > 0 && (
            <div className={styles.socialLinks}>
              {socialLinks.map((social, index) => (
                <Link
                  key={social.id || index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label={social.label}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            {copyright ||
              `© ${currentYear} Kuliner Lokal. All rights reserved.`}
          </p>
        </div>
      </div>
    </footer>
  );
}

import React, { Children } from 'react';
import { useRouter } from 'next/router';
import Link, { LinkProps } from 'next/link';

interface IActiveLinkProps {
  activeClassName: string;
}

const ActiveLink:React.FC<IActiveLinkProps & React.PropsWithChildren<LinkProps>> = ({ children, activeClassName, ...props }) => {
  const { asPath } = useRouter()
  const child = Children.only(children);

  // @ts-ignore
  const childClassName = child.props.className || ''

  const className =
    asPath === props.href || asPath === props.as
      ? `${childClassName} ${activeClassName}`.trim()
      : childClassName

  return (
    <Link {...props}>
      {React.cloneElement(child as React.ReactElement, {
        className: className || null,
      })}
    </Link>
  )
}

export default ActiveLink
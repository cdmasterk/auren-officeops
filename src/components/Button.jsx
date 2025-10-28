import React from 'react'


export default function Button({children, variant='outline', className='', ...props}){
const base = 'btn rounded-xl border text-sm';
const styles = {
outline: 'btn-outline',
primary: 'btn-primary',
ghost: 'btn-ghost'
}
return (
<button className={`${base} ${styles[variant]} ${className}`} {...props}>
{children}
</button>
)
}
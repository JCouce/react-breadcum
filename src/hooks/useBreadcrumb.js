import { useState } from 'react'

const useBreadcrumb = () => {
  const [expanded, setExpanded] = useState(false)
  
  const open = () => setExpanded(true)
  const close = () => setExpanded(false);
  
  return {
    expanded,
    open,
    close,
  }
}

export default useBreadcrumb
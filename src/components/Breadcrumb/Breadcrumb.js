import React from 'react';
import useBreadcrumb from '../../hooks/useBreadcrumb';
import BreadcrumbCollapser from '../BreadcrumbColapser/BreadcrumbColapser';
import { MdChevronLeft } from 'react-icons/md'

const BreadcrumbItem = ({children, ...props}) => (
  <li className="breadcrumb-item" {...props}>
    {children}
  </li>
);

const BreadcrumbSeparator = ({children, ...props}) => (
  <li className="breadcrumb-separator" {...props}>
    {children}
  </li>
);
const Breadcrumb = ({ separator = '/', collapse = {}, ...props }) => {
  //React automatically assigns and handles all of the key requirements to the original children for subsequent uses
  let children = React.Children.toArray(props.children)

  const { expanded, open, close } = useBreadcrumb();

  children = children.map ((child, index) => (
    <BreadcrumbItem key={`breadcrumb_item${index}`}>{child}</BreadcrumbItem>
  ));

  const { itemsBefore = 1, itemsAfter = 1, max = 4 } = collapse
  
  const totalItems = children.length
  const lastIndex = totalItems - 1
    
  children = children.reduce ((acc, child, index) => {
    const notLast = index < lastIndex;
    if (notLast) {
      acc.push (
        child,
        <BreadcrumbSeparator key={`breadcrumb_sep${index}`}>
          {separator}
        </BreadcrumbSeparator>
      );
    } else {
      acc.push (child);
    }
    return acc;
  }, []);
  console.log(expanded);
  if (!expanded || totalItems <= max) {
    children = [
      ...children.slice(0, itemsBefore),
      <BreadcrumbCollapser
        title='Expand'
        key='collapsed-seperator'
        onClick={open}
      />,
      ...children.slice(totalItems - itemsAfter, totalItems),
    ]
  }

  return <ol>
            {children}
            <p className="close" onClick={close}><MdChevronLeft/></p>
          </ol>;
};

export default Breadcrumb;

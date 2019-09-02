import React from 'react';

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
const Breadcrumb = ({ separator = '/', ...props }) => {
  //React automatically assigns and handles all of the key requirements to the original children for subsequent uses
  //let children = React.Children.toArray(props.children)

  let children = props.children.map ((child, index) => (
    <BreadcrumbItem key={`breadcrumb_item${index}`}>{child}</BreadcrumbItem>
  ));
  const lastIndex = children.length - 1;

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

  return <ol>{children}</ol>;
};

export default Breadcrumb;

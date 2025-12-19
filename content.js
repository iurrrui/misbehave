(function() {
  'use strict';
  
  // Track if we've already initialized to prevent double-loading
  if (window.hoverDisappearInitialized) return;
  window.hoverDisappearInitialized = true;

  // Define what can disappear - content elements, not containers
  const disappearableSelectors = [
    'p',           // paragraphs
    'h1, h2, h3, h4, h5, h6', // headings
    'span',        // text spans
    'a',           // links
    'button',      // buttons
    'img',         // images
    'video',       // videos
    'svg',         // icons/graphics
    'input',       // form inputs
    'textarea',    // text areas
    'label',       // form labels
    'li',          // list items
    'td, th',      // table cells
    'code',        // code blocks
    'pre',         // preformatted text
    'figcaption',  // figure captions
    'caption',     // table captions
    'legend',      // fieldset legends
    'blockquote',  // quotes
    'cite',        // citations
    'time',        // time elements
    'mark',        // highlighted text
    'em, strong, i, b', // emphasis/bold
    'small',       // small text
    'sub, sup',    // subscript/superscript
    'del, ins',    // deleted/inserted text
    'q',           // inline quotes
    'abbr',        // abbreviations
    'address'      // address text
  ].join(',');

  // Track mouse position to find deepest disappearable element
  document.addEventListener('mousemove', function(e) {
    // Get all elements at this point (deepest first)
    const elements = document.elementsFromPoint(e.clientX, e.clientY);
    
    // Find the first visible disappearable element
    let target = null;
    for (let el of elements) {
      if (el.classList.contains('hover-disappeared')) continue;
      
      // Check if this element matches our disappearable selectors
      if (el.matches(disappearableSelectors)) {
        target = el;
        break;
      }
    }
    
    if (!target) return;
    
    // Mark as disappeared
    target.classList.add('hover-disappeared');
    
    // Force cursor to default on the element
    target.style.setProperty('cursor', 'default', 'important');
    
    // Also reset cursor on parent elements that might have zoom/pointer cursors
    let parent = target.parentElement;
    while (parent && parent !== document.body) {
      const parentCursor = window.getComputedStyle(parent).cursor;
      if (parentCursor && parentCursor !== 'default' && parentCursor !== 'auto') {
        parent.style.setProperty('cursor', 'default', 'important');
      }
      parent = parent.parentElement;
    }
  });

  console.log('Hover Disappear extension active');
})();

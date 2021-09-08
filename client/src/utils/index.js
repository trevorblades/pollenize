import {useEffect, useMemo, useState} from 'react';
import {useWindowScroll} from 'react-use';

export async function uploadImage(image) {
  const body = new FormData();
  body.append('image', image);

  const response = await fetch(
    `https://api.imgbb.com/1/upload?key=${process.env.GATSBY_IMGBB_API_KEY}`,
    {
      body,
      method: 'post'
    }
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const {data} = await response.json();
  return data.url;
}

export function useFileHandler() {
  const [dataUrl, setDataUrl] = useState();

  function handleFileChange(event) {
    if (event.target.files.length) {
      const reader = new FileReader();
      reader.addEventListener('load', event => {
        setDataUrl(event.target.result);
      });

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  return [dataUrl, handleFileChange];
}

export function getCandidateTitles({name, party}, partyFirst) {
  if (party) {
    return partyFirst ? [party, name] : [name, party];
  }

  return [name];
}

export function useCurrentAnchor(threshold = 20) {
  const {y} = useWindowScroll();
  const [anchors, setAnchors] = useState([]);

  useEffect(() => {
    setAnchors(document.querySelectorAll('a.topic[name]'));
  }, []);

  return useMemo(() => {
    let index = -1;
    for (const anchor of anchors) {
      if (anchor.offsetTop > y + threshold) {
        break;
      }

      index++;
    }

    return index;
  }, [anchors, y, threshold]);
}

export function getMessageInputs(nodes) {
  return Array.from(typeof nodes.length !== 'undefined' ? nodes : [nodes])
    .filter(node => node.value)
    .map(node => {
      const message = {
        text: node.value,
        languageId: node.getAttribute('data-languageid')
      };

      return node.hasAttribute('data-id')
        ? {
            ...message,
            id: node.getAttribute('data-id')
          }
        : message;
    });
}

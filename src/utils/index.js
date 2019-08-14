import {format} from 'date-fns';
import {useState} from 'react';

export async function uploadImage(image) {
  const formData = new FormData();
  formData.append('image', image);

  // upload the new profile image to imgur and then save only the URL
  const response = await fetch('https://api.imgur.com/3/image', {
    method: 'POST',
    headers: {
      Authorization: `Client-ID ${process.env.GATSBY_IMGUR_CLIENT_ID}`
    },
    body: formData
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const {data} = await response.json();
  return data.link;
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

export function getCandidateTitles(
  {name, partyEn, partyFr},
  partyFirst,
  localize
) {
  if (partyEn || partyFr) {
    const party = localize(partyEn, partyFr);
    return partyFirst ? [party, name] : [name, party];
  }

  return [name];
}

export function formatDate(date) {
  return format(new Date(date), 'MMMM d, yyyy');
}

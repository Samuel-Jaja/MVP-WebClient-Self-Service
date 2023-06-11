// import axios, { AxiosResponse } from 'axios';
// import fs, { WriteStream } from 'fs';
const axios = require('axios');
const fs = require('fs');

async function downloadAssetFromRelease(prNumber: number, assetName: string, downloadPath: string): Promise<void> {
  try {
    const owner = 'Samuel-Jaja';
    const repo = 'WPF_BackgroundServices_App';
    const releasesUrl = `https://api.github.com/repos/${owner}/${repo}/releases`;

    // Fetch the releases
    const releasesResponse = await axios.get(releasesUrl);
    const releases = releasesResponse.data;

    // Find the release based on PR number
    const targetRelease = releases.find((release: any) =>
      release.name.includes(`PR-${prNumber}`)
    );

    if (!targetRelease) {
      throw new Error(`Release not found for PR-${prNumber}`);
    }

    // Find the asset based on the asset name
    const targetAsset = targetRelease.assets.find(
      (asset: any) => asset.name === assetName
    );

    if (!targetAsset) {
      throw new Error(`Asset ${assetName} not found in the release for PR-${prNumber}`);
    }

    // Download the asset
    const downloadUrl: string = targetAsset.browser_download_url;
    const writer = fs.createWriteStream(downloadPath);

    const downloadResponse = await axios({
      url: downloadUrl,
      method: 'GET',
      responseType: 'stream',
    });

    downloadResponse.data.pipe(writer);

    return new Promise<void>((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  } catch (error) {
    console.error('Error occurred while downloading the asset:', error);
    throw error;
  }
}

// Usage example
const prNumber = 2;
const assetName = 'WPF_BackgroundServices_App.exe';
const downloadPath = 'C:/Users/kazor/Downloads/WPF_BackgroundServices_App.exe';

downloadAssetFromRelease(prNumber, assetName, downloadPath)
  .then(() => {
    console.log(`Asset ${assetName} downloaded successfully!`);
  })
  .catch((error) => {
    console.error('Error occurred:', error);
  });

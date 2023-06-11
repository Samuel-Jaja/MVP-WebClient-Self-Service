import { RepoBaseUri, Owner } from '../config/githubConfig';
import { downloadRelease, headers } from '../Services/githubService';
//import PullRequests from './PullRequest'

//const destinationPath: string = "C:/ProgramData/CypherCrescent/builds";

export async function downloadAsset(pullRequestNumber: number) {
    try {
      const repo = 'WPF_BackgroundServices_App';

      // const pullRequest =  pullRequests.value.find(pr => pr.number === pullRequestNumber);
      // if (!pullRequest) {
      //   console.error(`Pull request with number ${pullRequestNumber} not found.`);
      //   return;
      // }

      const releasesUrl = `${RepoBaseUri}${Owner}/${repo}/releases`;
      const response = await fetch(releasesUrl, { headers });
      if (!response.ok) {
        throw new Error(`Failed to fetch releases: ${response.status} ${response.statusText}`);
      }

      const releases = await response.json();
      const release = releases.find((r: any) => r.pull_request?.number === pullRequestNumber);
      if (!release) {
        console.error(`Release for pull request ${pullRequestNumber} not found.`);
        return;
      }

      const asset = release.assets[0]; // Assuming there is only one asset per release
      const downloadUrl = asset.browser_download_url;

      // Perform the download using the downloadRelease function
      const blob = await downloadRelease(downloadUrl);

      // Create a temporary anchor element and trigger the download
      const anchor = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      anchor.href = objectUrl;
      anchor.download = asset.name;
      anchor.click();

      // Clean up the temporary URL
      URL.revokeObjectURL(objectUrl);
    } catch (error) {
      console.error('Error downloading asset:', error);
    }
}

// export async function downloadRelease1() {
  
// }  

// export async function downloadFile() {
//   destinationPath
// }

// export async function checkIfPRAlreadyExist() {
  
// }

// export async function createDiretoryIfNotExist() {
  
// }

// export async function DeletFileIfExist() {
  
// }


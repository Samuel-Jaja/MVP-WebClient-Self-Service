// import { reactive } from "vue";

// class Release {
//   private msgSender: IMessages;
//   private readonly destinationPath = "C:/ProgramData/CypherCrescent/builds";
//   private readonly gitRepo: IPullRequestService;

//   public DownloadReleaseUrl: string | null = null;
//   public PRNumber: number;
//   public DownloadProgress: number = 0;

//   constructor(prNumber: number) {
//     this.gitRepo = App.serviceProvider.GetRequiredService<IPullRequestService>();
//     this.msgSender = App.serviceProvider.GetRequiredService<IMessages>();
//     this.PRNumber = prNumber;
//   }

//   public DownloadPRRelease() {
//     const result = this.CreateDirectoryIfNotExist(this.destinationPath);
//     if (!result.isSuccess) {
//       this.msgSender.ShowMessage(result.reasonPhrase);
//       return;
//     }
//     if (this.IsDownloadInProgress) {
//       this.msgSender.ShowMessage(DownloadAlreadyRunning);
//       return;
//     }

//     try {
//       const exeFile = new DirectoryInfo(this.destinationPath).GetFiles("*.exe").FirstOrDefault();
//       if (exeFile != null) {
//         // Perform file operations if needed
//       }
//     } catch (e) {
//       this.msgSender.ShowMessage(ProjectAlreadyLaunch);
//       return;
//     }

//     if (!this.CheckIfPRAlreadyExist()) {
//       result = this.DeleteFileIfExist(this.destinationPath);
//       if (!result.isSuccess) {
//         this.msgSender.ShowMessage(result.reasonPhrase);
//         return;
//       }
//       this.DownloadFile();
//     }
//   }

//   public CanDownload(): boolean {
//     return this.DownloadReleaseUrl !== null;
//   }

//   private async DownloadFile() {
//     this.IsDownloadInProgress = true;
//     const result = await this.gitRepo.DownloadRelease(this.DownloadReleaseUrl || "");
//     if (!result.isSuccess) {
//       this.IsDownloadInProgress = false;
//       this.msgSender.ShowMessage(result.reasonPhrase);
//       return;
//     }

//     const httpContent = result.data as HttpContent;
//     const totalBytes = httpContent?.headers?.contentLength || -1;
//     let readBytes = 0;

//     const contentStream = await httpContent?.readAsStream();
//     const fullPath = `${this.destinationPath}/${this.PRNumber}/${this.DownloadReleaseUrl!.split("/")[^1]}`;
//     const fileStream = new FileStream(fullPath, FileMode.Create, FileAccess.Write, FileShare.None);
//     const buffer = new Uint8Array(4096);
//     let isMoreToRead = true;

//     do {
//       const bytesRead = await contentStream?.read(buffer);
//       if (bytesRead === 0) {
//         isMoreToRead = false;
//         continue;
//       }

//       try {
//         await fileStream.write(buffer, 0, bytesRead);
//       } catch (e) {
//         isMoreToRead = false;
//         this.msgSender.ShowMessage(e.message);
//         continue;
//       }

//       readBytes += bytesRead;
//       this.DownloadProgress = (readBytes * 100) / totalBytes;
//     } while (isMoreToRead);

//     this.IsDownloadInProgress = false;
//   }

//   private CreateDirectoryIfNotExist(path: string): ActionResult {
//     const result: ActionResult = new ActionResult();

//     if (!fs.existsSync(path)) {
//       try {
//         fs.mkdirSync(path);
//       } catch (e) {
//         result.addError(e.message);
//       }
//     }

//     return result;
//   }

//   public DeleteFileIfExist(path: string): ActionResult {
//     const result: ActionResult = new ActionResult();
//     const directory = new DirectoryInfo(path);

//     this.IsDownloadInProgress = true;

//     for (const file of directory.getFiles()) {
//       try {
//         file.deleteSync();
//       } catch (e) {
//         result.addError(e.message);
//       }
//     }

//     for (const dir of directory.getDirectories()) {
//       try {
//         dir.deleteSync({ recursive: true });
//       } catch (e) {
//         result.addError(e.message);
//       }
//     }

//     this.IsDownloadInProgress = false;

//     return result;
//   }

//   private static IsDownloadInProgress = false;

//   private CheckIfPRAlreadyExist(): boolean {
//     try {
//       const exeFile = new DirectoryInfo(this.destinationPath).getFiles("*.exe").FirstOrDefault();
//       if (exeFile === null) {
//         return false;
//       }
//       if (exeFile.name !== `${this.PRNumber}${this.DownloadReleaseUrl!.split("/")[^1]}`) {
//         return false;
//       }
//       try {
//         // Start process
//         return true;
//       } catch (e) {
//         return false;
//       }
//     } catch (e) {
//       this.msgSender.ShowMessage(e.message);
//       return true;
//     }
//   }
// }

// // Define the required interfaces and classes used in the original code
// interface BindableBase {}

// interface IMessages {
//   ShowMessage(message: string): void;
// }

// interface IPullRequestService {
//   DownloadRelease(url: string): Promise<any>;
// }

// class ActionResult {
//   public isSuccess: boolean = true;
//   public reasonPhrase: string = "";
//   public data: any = null;

//   public addError(error: string) {
//     this.isSuccess = false;
//     this.reasonPhrase = error;
//   }
// }

// // Create an instance of the Release class
// const release = new Release(123);

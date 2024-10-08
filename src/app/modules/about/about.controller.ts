import { Request, Response } from "express";
import asyncHandler from "../../../shared/async.handler";
import { File, RequestWithFiles } from "../../../interfaces/files.type";
import ApiError from "../../../errors/api.error";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../../../shared/cloudinary";
import { About } from "./about.model";
import resSender from "../../../shared/res.sender";
import { IAbout } from "./about.interface";

const create = asyncHandler(async (req: RequestWithFiles, res: Response) => {
  const {
    eyebrow,
    title,
    description,
    service1,
    service2,
    service3,
    service4,
    directorName,
    directorDesignation,
    button,
    buttonUrl,
  } = req.body;
  if (
    [
      eyebrow,
      title,
      description,
      service1,
      service2,
      service3,
      service4,
      directorName,
      directorDesignation,
      button,
      buttonUrl,
    ].some((x) => x.trim() === "")
  ) {
    throw new ApiError(400, "Please fill all the fields");
  }
  const service1IconLocal: File | undefined = req.files?.service1[0];
  const service2IconLocal: File | undefined = req.files?.service2[0];
  const service3IconLocal: File | undefined = req.files?.service3[0];
  const service4IconLocal: File | undefined = req.files?.service4[0];
  const leftImageLocal: File | undefined = req.files?.leftImage[0];
  const rightImageLocal: File | undefined = req.files?.rightImage[0];
  const playButtonLocal: File | undefined = req.files?.playButton[0];
  const dotShapeLocal: File | undefined = req.files?.dotShape[0];
  const circleShapeLocal: File | undefined = req.files?.circleShape[0];
  const rectangleShapeLocal: File | undefined = req.files?.rectangleShape[0];
  const layShapeLocal: File | undefined = req.files?.layShape[0];
  const directorImageLocal: File | undefined = req.files?.directorImage[0];
  const directorSignLocal: File | undefined = req.files?.directorSign[0];

  if (!service1IconLocal) {
    throw new ApiError(400, "Service 1 icon is required");
  }
  if (!service2IconLocal) {
    throw new ApiError(400, "Service 2icon is required");
  }
  if (!service3IconLocal) {
    throw new ApiError(400, "Service 3 icon is required");
  }
  if (!service4IconLocal) {
    throw new ApiError(400, "Service 4 icon is required");
  }
  if (!leftImageLocal) {
    throw new ApiError(400, "Left image is required");
  }
  if (!rightImageLocal) {
    throw new ApiError(400, "Right image is required");
  }
  if (!playButtonLocal) {
    throw new ApiError(400, "Play button is required");
  }
  if (!dotShapeLocal) {
    throw new ApiError(400, "Dot shape is required");
  }
  if (!circleShapeLocal) {
    throw new ApiError(400, "Circle shape is required");
  }
  if (!rectangleShapeLocal) {
    throw new ApiError(400, "Rectangle shape is required");
  }
  if (!layShapeLocal) {
    throw new ApiError(400, "Lay shape is required");
  }
  if (!directorImageLocal) {
    throw new ApiError(400, "Director image is required");
  }
  if (!directorSignLocal) {
    throw new ApiError(400, "Director sign is required");
  }
  const service1Icon = await uploadOnCloudinary(service1IconLocal.path);
  const service2Icon = await uploadOnCloudinary(service2IconLocal.path);
  const service3Icon = await uploadOnCloudinary(service3IconLocal.path);
  const service4Icon = await uploadOnCloudinary(service4IconLocal.path);
  const leftImage = await uploadOnCloudinary(leftImageLocal.path);
  const rightImage = await uploadOnCloudinary(rightImageLocal.path);
  const playButton = await uploadOnCloudinary(playButtonLocal.path);
  const dotShape = await uploadOnCloudinary(dotShapeLocal.path);
  const circleShape = await uploadOnCloudinary(circleShapeLocal.path);
  const rectangleShape = await uploadOnCloudinary(rectangleShapeLocal.path);
  const layShape = await uploadOnCloudinary(layShapeLocal.path);
  const directorImage = await uploadOnCloudinary(directorImageLocal.path);
  const directorSign = await uploadOnCloudinary(directorSignLocal.path);

  const aboutData = {
    eyebrow,
    title,
    description,
    services: [
      {
        name: service1,
        image: {
          src: service1Icon?.url,
          alt: service2IconLocal?.fieldname,
        },
      },
      {
        name: service2,
        image: {
          src: service2Icon?.url,
          alt: service2IconLocal?.fieldname,
        },
      },
      {
        name: service3,
        image: {
          src: service3Icon?.url,
          alt: service2IconLocal?.fieldname,
        },
      },
      {
        name: service4,
        image: {
          src: service4Icon?.url,
          alt: service2IconLocal?.fieldname,
        },
      },
    ],
    director: {
      name: directorName,
      designation: directorDesignation,
      image: {
        src: directorImage?.url,
        alt: directorImageLocal?.fieldname,
      },
      sign: {
        src: directorSign?.url,
        alt: directorSignLocal?.fieldname,
      },
    },
    button: {
      name: button,
      url: buttonUrl,
    },
    leftImage: {
      src: leftImage?.url,
      alt: leftImageLocal?.fieldname,
    },
    rightImage: {
      src: rightImage?.url,
      alt: rightImageLocal?.fieldname,
    },
    playButton: {
      src: playButton?.url,
      alt: playButtonLocal?.fieldname,
    },
    dotShape: {
      src: dotShape?.url,
      alt: dotShapeLocal?.fieldname,
    },
    circleShape: {
      src: circleShape?.url,
      alt: circleShapeLocal?.fieldname,
    },
    rectangleShape: {
      src: rectangleShape?.url,
      alt: rectangleShapeLocal?.fieldname,
    },
    layShape: {
      src: layShape?.url,
      alt: layShapeLocal?.fieldname,
    },
  };
  const about = await About.create(aboutData);
  resSender<IAbout>(res, {
    statusCode: 201,
    success: true,
    message: "About created successfully",
    data: about,
  });
});

const read = asyncHandler(async (req: Request, res: Response) => {
  const about = await About.findOne();
  resSender<IAbout>(res, {
    statusCode: 200,
    success: true,
    message: "About fetched successfully",
    data: about,
  });
});

const update = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...data } = req.body;
  const about = await About.findByIdAndUpdate(id, data, { new: true });
  resSender<IAbout>(res, {
    statusCode: 200,
    success: true,
    message: "About updated successfully",
    data: about,
  });
});

const vanish = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const about = await About.findById(id);
  if (!about) {
    throw new ApiError(404, "About not found");
  }
  await deleteFromCloudinary(about?.leftImage?.src);
  await deleteFromCloudinary(about?.rightImage?.src);
  await deleteFromCloudinary(about?.playButton?.src);
  await deleteFromCloudinary(about?.dotShape?.src);
  await deleteFromCloudinary(about?.circleShape?.src);
  await deleteFromCloudinary(about?.rectangleShape?.src);
  await deleteFromCloudinary(about?.layShape?.src);

  await deleteFromCloudinary(about?.director?.image?.src);
  await deleteFromCloudinary(about?.director?.sign?.src);

  await deleteFromCloudinary(about?.services[0]?.image?.src);
  await deleteFromCloudinary(about?.services[1]?.image?.src);
  await deleteFromCloudinary(about?.services[2]?.image?.src);
  await deleteFromCloudinary(about?.services[3]?.image?.src);

  const aboutD = await About.findByIdAndDelete(id);

  resSender<IAbout>(res, {
    statusCode: 200,
    success: true,
    message: "About vanished successfully",
    data: aboutD,
  });
});

export const aboutController = { create, read, update, vanish };

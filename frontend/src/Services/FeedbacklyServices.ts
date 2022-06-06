import axios from './axios';

import { Feedbackly } from "@/Interfaces/FeedbacklyInterfce";

export const getEmoticonAverage = async () => await axios.get("/emoticon-average")

export const getNpsGroups = async () => await axios.get("/nps-groups")

export const getNpsScore = async () => await axios.get("/nps-score")
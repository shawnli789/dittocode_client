import axios from 'axios';
import AuthContext from '../store/auth-context';
import { useContext, useCallback, useMemo } from 'react';
import { 
  getProblemsMap, 
  getProblemsLatestPractices, 
  getFormattedDuration, 
  convertUTCToLocal 
} from '../utils/helper';

function useAxiosInstance() {
  const authCtx = useContext(AuthContext);
  const axiosInstance = useMemo(() => axios.create({
    baseURL: process.env.REACT_APP_API_ENDPOINT,
    timeout: 8000,
    headers: { 'Authorization': 'Bearer ' + authCtx.token }
  }), [authCtx.token]);


  const getProblems = useCallback(async () => {
    try {
      const response = await axiosInstance.get('/problems/');
      const practices = response.data.problems;
      const problemsMap = getProblemsMap(practices);
      const problemsLatestPractices = getProblemsLatestPractices(problemsMap);
      for (let practice of problemsLatestPractices) {
        // Convert created date in UTC to local time.
        const localCreatedAt = convertUTCToLocal(practice.created_at);
        practice.lastPractice = getFormattedDuration(localCreatedAt);
      }
      return [problemsLatestPractices, problemsMap, practices];
    } catch (err) {
      throw (err)
    }
  }, [axiosInstance]);
  
  const postProblem = async (problem) => {
    try {
      const response = await axiosInstance.post('/problems/', problem);
      return response;
    } catch (err) {
      throw (err)
    }
  }

  const postProblemValidator = async (problem) => {
    try {
      const response = await axiosInstance.post('/problem-validator/', problem);
      return response;
    } catch (err) {
      throw (err)
    }
  }

  const deleteProblem = async (id) => {
    try {
      const response = await axiosInstance.delete('/problems/' + id);
      return response;
    } catch (err) {
      throw (err)
    }
  };

  const postSession = async (credentials) => {
    try {
      const response = await axiosInstance.post('/sessions/', credentials);
      return response;
    } catch (err) {
      throw (err)
    }
  }

  const getUser = useCallback(async () => {
    try {
      const response = await axiosInstance.get('/user/');
      return response;
    } catch (err) {
      throw (err)
    }
  }, [axiosInstance])

  const postUser = async (userInfo) => {
    try {
      const response = await axiosInstance.post('/users/', userInfo);
      return response;
    } catch (err) {
      throw (err)
    }
  }

  const getUsers = useCallback(async () => {
    try {
      const response = await axiosInstance.get('/users/');
      return response;
    } catch (err) {
      throw (err)
    }
  }, [axiosInstance])

  const getLeetCodeProblems = useCallback(async () => {
    try {
      const response = await axiosInstance.get('/leetcode-problems/');
      return response;
    } catch (err) {
      throw (err)
    }
  }, [axiosInstance])

  const getLeetCodeProblem = useCallback(async (titleSlug) => {
    try {
      const response = await axiosInstance.get('/leetcode-problem/' + titleSlug + '/');
      return response;
    } catch (err) {
      throw (err)
    }
  }, [axiosInstance])

  return {
    getProblems: getProblems,
    postProblem: postProblem,
    postProblemValidator: postProblemValidator,
    deleteProblem: deleteProblem,
    postSession: postSession,
    getUser: getUser,
    postUser: postUser,
    getUsers: getUsers,
    getLeetCodeProblems: getLeetCodeProblems,
    getLeetCodeProblem: getLeetCodeProblem
  }
}

export default useAxiosInstance;
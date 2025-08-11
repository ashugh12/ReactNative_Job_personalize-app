import React from 'react'
import { View, Text, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl } from 'react-native'
import { Stack, useRouter, useLocalSearchParams } from 'expo-router'
import { useCallback, useState } from 'react'
import { Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics } from "../../components"

import { COLORS, icons, SIZES } from '../../constants'
import useFetch from '@/hook/useFetch'



const JobDetails = () => {

    const param = useLocalSearchParams();
    const router = useRouter();
    const onRefresh = () => { }
    
    const {data, isLoading, error, refetch}= useFetch('job-details', {
        job_id: param.id
    });
    const job = data[0] as any;
    const [refreshing, setRefreshing] = useState(false);
    const tabs = ["About", "Qualifications", "Responsibilities"];
    const [activeTab, setActiveTab] = useState(tabs[0]);

    const displayTabContent = () => {
        switch (activeTab) {
            case "About":
                return <JobAbout info={job.job_description} />
            case "Qualifications":
                return <Specifics 
                    title="Qualifications"
                    points={job.job_highlights?.Qualifications ?? ["N/A"]}
                />
            case "Responsibilities":
                return <Specifics 
                    title="Responsibilities"
                    points={job.job_highlights.Responsibilities ?? ["N/A"]}
                />
            default:
                break;
        }
    }
  return (
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
          <Stack.Screen
              options={{
                  headerStyle: { backgroundColor: COLORS.lightWhite },
                  headerShadowVisible: false,
                  headerBackVisible: false,
                  headerLeft: () => (
                              <ScreenHeaderBtn
                                iconUrl={icons.menu}
                                dimension="60%"
                                handlePress={() => {}}
                              />
                            )
                            ,
                            headerRight: () => (
                              <ScreenHeaderBtn
                                iconUrl={icons.share}
                                dimension="60%"
                                handlePress={() => {}}
                              />
                            ),
                            headerTitle: "",
              }}
          />

          <>
              <ScrollView showsVerticalScrollIndicator={false}
                  refreshControl={
                      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                  }
              >
                  {isLoading ? (
                      <ActivityIndicator size='large' color={COLORS.primary}/>
                  ) : error ? (
                      <Text>Something went wrong</Text>
                  ) : data.length === 0 ? (
                      <Text>No data found</Text>
                  ) : (
                                  <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
                                      
                                      <Company companyLogo={job.employer_logo}
                                          jobTitle={job.job_title}
                                          companyName={job.employer_name} 
                                          location={job.job_country}
                                      />

                                      <JobTabs 
                                          tabs={tabs}
                                          activeTab={activeTab} 
                                          setActiveTab={setActiveTab} />
                                      
                                        {displayTabContent()}

                      </View>
                  )}
              </ScrollView>

              <JobFooter url={job?.job_google_link ?? 'https://careers.google.com/jobs/results/'} />
          </>
      </SafeAreaView>
  )
}

export default JobDetails
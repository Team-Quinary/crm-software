import React from 'react'
import "./Featured.css"
import GridViewIcon from '@mui/icons-material/GridView';
import PhoneCallbackIcon from '@mui/icons-material/PhoneCallback';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export default function Featured() {
  return (
      <>
          <div className='hometopbar'>
              <div className='hometopbarwrapper'>
                  <div className='categorytop'>
                      <GridViewIcon/>
                      <span className='categories'>Browse Categories</span>
                  </div>
                  <div className='hometopbarright'>
                      <div className='hometopbaricons'>
                          home
                      </div>
                      <div className='hometopbaricons'>
                          community
                      </div>
                      <div className='hometopbaricons'>
                          about
                      </div>
                      <div className='hometopbaricons'>
                          business
                      </div>
                      <div className='hometopbaricons'>
                          help
                      </div>
                      <div className='hometopbaricons'>
                          contact
                      </div>
                  </div>
                  <div className='hometopbarcorner'>
                      <PhoneCallbackIcon/>
                      Hotline : 0455603327
                  </div>
              </div>
          </div>
          <div className='wrapperfeatured'>
              <div className='featureditem'>
                  <span className='featuredtitle'>Progress</span>
                  <div className='featuredprogress'>
                      <span className='progresscomplete'>30%</span>
                      <span className='progressrate'>
                          11.34 <ArrowUpwardIcon className='uparrow' />
                      </span>
                  </div>
                  <span className='featuredsub'>Compare to last month</span>
              </div>
              <div className='featureditem'>
                  <span className='featuredtitle'>Sales</span>
                  <div className='featuredprogress'>
                      <span className='progresscomplete'>10%</span>
                      <span className='progressrate'>
                          -11.34 <ArrowDownwardIcon className='downarrow' />
                      </span>
                  </div>
                  <span className='featuredsub'>Compare to last month</span>
              </div>
              <div className='featureditem'>
                  <span className='featuredtitle'>Customer Satisfaction</span>
                  <div className='featuredprogress'>
                      <span className='progresscomplete'>80%</span>
                      <span className='progressrate'>
                          55<ArrowUpwardIcon className='uparrow' />
                      </span>
                  </div>
                  <span className='featuredsub'>80% of customer satisfcation</span>
              </div>
          </div>
      </>
  )
}

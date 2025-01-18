import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import image from '../Images/circuit_breaker_dataset.jpg';

function DataSetProgram() {
  // Circuit-Breaker Data Set
  const tableData = [
    { size: "1.5", conduit: { current: 15, breaker: 10 }, multiCore: { current: 18, breaker: 10 }, singleCore: { current: 24, breaker: 20 } },
    { size: "2.5", conduit: { current: 20, breaker: 16 }, multiCore: { current: 26, breaker: 20 }, singleCore: { current: 32, breaker: 25 } },
    { size: "4", conduit: { current: 25, breaker: 20 }, multiCore: { current: 34, breaker: 25 }, singleCore: { current: 42, breaker: 35 } },
    { size: "6", conduit: { current: 33, breaker: 25 }, multiCore: { current: 44, breaker: 35 }, singleCore: { current: 54, breaker: 50 } },
    { size: "10", conduit: { current: 45, breaker: 35 }, multiCore: { current: 61, breaker: 50 }, singleCore: { current: 73, breaker: 63 } },
    { size: "16", conduit: { current: 61, breaker: 50 }, multiCore: { current: 82, breaker: 63 }, singleCore: { current: 98, breaker: 80 } },
    { size: "25", conduit: { current: 83, breaker: 63 }, multiCore: { current: 108, breaker: 80 }, singleCore: { current: 129, breaker: 100 } },
    { size: "35", conduit: { current: 103, breaker: 80 }, multiCore: { current: 135, breaker: 100 }, singleCore: { current: 158, breaker: 125 } },
    { size: "50", conduit: { current: 132, breaker: 100 }, multiCore: { current: 168, breaker: 125 }, singleCore: { current: 198, breaker: 160 } },
    { size: "70", conduit: { current: 165, breaker: 125 }, multiCore: { current: 207, breaker: 160 }, singleCore: { current: 245, breaker: 200 } },
    { size: "95", conduit: { current: 197, breaker: 160 }, multiCore: { current: 250, breaker: 200 }, singleCore: { current: 292, breaker: 250 } },
    { size: "120", conduit: { current: 235, breaker: 200 }, multiCore: { current: 292, breaker: 250 }, singleCore: { current: 344, breaker: 315 } },
  ];

  return (
    <>
      <div className="cards-lg-containers-card">
        <img src={image} />
        <div className="category">
          <div className="subject">
            <h3>Software/Electricity</h3>
          </div>
          <img src={`${process.env.PUBLIC_URL}/logo.png`} />
        </div>
        <h2 className="course-title">Circuit-Breaker/Cable (Data Sets)</h2>
        <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#BreakerData">Breaker Data</button>
        <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#CableData">Cable Data</button>
      </div>

      {/* Circuit-Breaker Data Modal */}
      <div className="modal fade" id="BreakerData" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Circuit-Breaker (Data Sets)</h5>
              <button type="button" className="btn close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="container-fluid">
                <div className="row d-flex justify-content-center align-items-center">
                  <div className="col-10 p-2 mt-2">
                    <h3 className="HeaderStyleH2">Household load breakers table</h3>
                    <p className="text-center">The following table shows the cable cross-section,
                      the amount of current it can withstand, and the breaker value
                      Suitable according to the extension method for household installations and wiring circuits
                    </p>
                    <table className="table table-bordered table-hover text-center">
                      <thead className="thead-dark">
                        <tr>
                          <th rowSpan="2">Cross-sectional area of ​​copper wire mm<sup>2</sup></th>
                          <th colSpan="2">One ​​or more cables lying in pipes</th>
                          <th colSpan="2">Multi-core cables</th>
                          <th colSpan="2">Single core cables lying in the air</th>
                        </tr>
                        <tr>
                          <th>Cable current (A)</th>
                          <th>The value of the cutter (A)</th>
                          <th>Cable current (A)</th>
                          <th>The value of the cutter (A)</th>
                          <th>Cable current (A)</th>
                          <th>The value of the cutter (A)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableData.map((row, index) => (
                          <tr key={index}>
                            <td>{row.size}</td>
                            <td>{row.conduit.current}</td>
                            <td>{row.conduit.breaker}</td>
                            <td>{row.multiCore.current}</td>
                            <td>{row.multiCore.breaker}</td>
                            <td>{row.singleCore.current}</td>
                            <td>{row.singleCore.breaker}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>

      {/* Cable Data Modal */}
      <div className="modal fade" id="CableData" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Cable (Data Sets)</h5>
              <button type="button" className="btn close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="container-fluid">
                <div className="row d-flex justify-content-center align-items-center">
                  <div className="col-10 p-2 mt-2">
                    <h2 className="HeaderStyleH2">Cable Loads Table</h2>

                    {/* Copper Cables Table */}
                    <div className="mb-5">
                      <h2 className="HeaderStyleH2">Copper Cable Loads Table</h2>
                      <table className="table table-bordered table-hover text-center">
                        <thead className="thead-dark">
                          <tr>
                            <th rowSpan="2">Wire cross-sectional area (mm2)</th>
                            <th colSpan="7">Cable extension method</th>
                          </tr>
                          <tr>
                            <th>A1</th>
                            <th>A2</th>
                            <th>B1</th>
                            <th>B2</th>
                            <th>C</th>
                            <th>D1</th>
                            <th>D2</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr><td>1.5</td><td>13.5</td><td>13</td><td>15.5</td><td>15</td><td>17.5</td><td>18</td><td>19</td></tr>
                          <tr><td>2.5</td><td>18</td><td>17.5</td><td>21</td><td>20</td><td>24</td><td>24</td><td>24</td></tr>
                          <tr><td>4</td><td>24</td><td>23</td><td>28</td><td>27</td><td>32</td><td>30</td><td>33</td></tr>
                          <tr><td>6</td><td>31</td><td>29</td><td>36</td><td>34</td><td>41</td><td>38</td><td>41</td></tr>
                          <tr><td>10</td><td>42</td><td>39</td><td>50</td><td>46</td><td>57</td><td>50</td><td>54</td></tr>
                          <tr><td>16</td><td>56</td><td>52</td><td>68</td><td>62</td><td>76</td><td>64</td><td>70</td></tr>
                          <tr><td>25</td><td>73</td><td>68</td><td>89</td><td>80</td><td>96</td><td>82</td><td>92</td></tr>
                          <tr><td>35</td><td>89</td><td>83</td><td>110</td><td>99</td><td>119</td><td>98</td><td>110</td></tr>
                          <tr><td>50</td><td>108</td><td>99</td><td>134</td><td>118</td><td>144</td><td>116</td><td>130</td></tr>
                          <tr><td>70</td><td>136</td><td>125</td><td>171</td><td>149</td><td>184</td><td>143</td><td>162</td></tr>
                          <tr><td>95</td><td>164</td><td>150</td><td>207</td><td>179</td><td>223</td><td>169</td><td>193</td></tr>
                          <tr><td>120</td><td>188</td><td>172</td><td>239</td><td>206</td><td>259</td><td>192</td><td>220</td></tr>
                          <tr><td>150</td><td>216</td><td>196</td><td>262</td><td>225</td><td>299</td><td>217</td><td>246</td></tr>
                          <tr><td>185</td><td>245</td><td>223</td><td>296</td><td>255</td><td>341</td><td>243</td><td>278</td></tr>
                          <tr><td>240</td><td>286</td><td>261</td><td>346</td><td>297</td><td>403</td><td>280</td><td>320</td></tr>
                          <tr><td>300</td><td>328</td><td>298</td><td>394</td><td>339</td><td>464</td><td>316</td><td>359</td></tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Aluminum Cables Table */}
                    <div className="mb-5">
                      <h2 className="HeaderStyleH2">Aluminum cable loads table</h2>
                      <table className="table table-bordered table-hover text-center">
                        <thead className="thead-dark">
                          <tr>
                            <th rowSpan="2">Wire cross-sectional area (mm2)</th>
                            <th colSpan="7">Cable extension method</th>
                          </tr>
                          <tr>
                            <th>A1</th>
                            <th>A2</th>
                            <th>B1</th>
                            <th>B2</th>
                            <th>C</th>
                            <th>D1</th>
                            <th>D2</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr><td>2.5</td><td>14</td><td>13.5</td><td>16.5</td><td>15.5</td><td>18.5</td><td>18.5</td><td>-</td></tr>
                          <tr><td>4</td><td>18.5</td><td>17.5</td><td>22</td><td>21</td><td>25</td><td>24</td><td>-</td></tr>
                          <tr><td>6</td><td>24</td><td>23</td><td>28</td><td>27</td><td>32</td><td>30</td><td>-</td></tr>
                          <tr><td>10</td><td>32</td><td>31</td><td>39</td><td>36</td><td>44</td><td>39</td><td>-</td></tr>
                          <tr><td>16</td><td>43</td><td>41</td><td>53</td><td>48</td><td>59</td><td>50</td><td>53</td></tr>
                          <tr><td>25</td><td>57</td><td>53</td><td>70</td><td>62</td><td>73</td><td>64</td><td>69</td></tr>
                          <tr><td>35</td><td>70</td><td>65</td><td>86</td><td>77</td><td>90</td><td>77</td><td>83</td></tr>
                          <tr><td>50</td><td>84</td><td>78</td><td>104</td><td>92</td><td>110</td><td>91</td><td>99</td></tr>
                          <tr><td>70</td><td>107</td><td>98</td><td>133</td><td>116</td><td>140</td><td>112</td><td>122</td></tr>
                          <tr><td>95</td><td>129</td><td>118</td><td>161</td><td>139</td><td>170</td><td>132</td><td>148</td></tr>
                          <tr><td>120</td><td>149</td><td>135</td><td>186</td><td>160</td><td>197</td><td>150</td><td>169</td></tr>
                          <tr><td>150</td><td>170</td><td>155</td><td>204</td><td>176</td><td>227</td><td>169</td><td>189</td></tr>
                          <tr><td>185</td><td>194</td><td>176</td><td>230</td><td>199</td><td>259</td><td>190</td><td>214</td></tr>
                          <tr><td>240</td><td>227</td><td>207</td><td>269</td><td>232</td><td>305</td><td>218</td><td>250</td></tr>
                          <tr><td>300</td><td>261</td><td>237</td><td>306</td><td>265</td><td>351</td><td>247</td><td>282</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DataSetProgram;
